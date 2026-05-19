param(
  [string]$Owner = "Slaybol",
  [string]$Repo = "Woodinville-Sports",
  [string]$ConfigPath = "docs/github-issues.json"
)

$ErrorActionPreference = "Stop"

$token = $env:GH_TOKEN
if (-not $token) {
  $token = $env:GITHUB_TOKEN
}

if (-not $token) {
  throw "Set GH_TOKEN or GITHUB_TOKEN to a GitHub personal access token with repo issue permissions, then rerun this script."
}

$config = Get-Content -LiteralPath $ConfigPath -Raw | ConvertFrom-Json
$baseUri = "https://api.github.com/repos/$Owner/$Repo"
$headers = @{
  "Accept" = "application/vnd.github+json"
  "Authorization" = "Bearer $token"
  "X-GitHub-Api-Version" = "2022-11-28"
}

function Invoke-GitHub {
  param(
    [string]$Method,
    [string]$Uri,
    [object]$Body = $null
  )

  $params = @{
    Method = $Method
    Uri = $Uri
    Headers = $headers
  }

  if ($null -ne $Body) {
    $params.Body = ($Body | ConvertTo-Json -Depth 20)
    $params.ContentType = "application/json"
  }

  Invoke-RestMethod @params
}

function Get-AllPages {
  param([string]$Uri)

  $items = @()
  $page = 1
  while ($true) {
    $separator = "?"
    if ($Uri.Contains("?")) {
      $separator = "&"
    }

    $pageItems = Invoke-GitHub -Method "GET" -Uri "$Uri${separator}per_page=100&page=$page"
    if (-not $pageItems -or $pageItems.Count -eq 0) {
      break
    }

    $items += $pageItems
    if ($pageItems.Count -lt 100) {
      break
    }

    $page++
  }

  $items
}

Write-Host "Creating labels..."
$existingLabels = Get-AllPages "$baseUri/labels"
$existingLabelNames = @{}
foreach ($label in $existingLabels) {
  $existingLabelNames[$label.name] = $true
}

foreach ($label in $config.labels) {
  if ($existingLabelNames.ContainsKey($label.name)) {
    Write-Host "  exists: $($label.name)"
    continue
  }

  Invoke-GitHub -Method "POST" -Uri "$baseUri/labels" -Body @{
    name = $label.name
    color = $label.color
    description = $label.description
  } | Out-Null
  Write-Host "  created: $($label.name)"
}

Write-Host "Creating milestones..."
$existingMilestones = Get-AllPages "$baseUri/milestones?state=all"
$milestoneByTitle = @{}
foreach ($milestone in $existingMilestones) {
  $milestoneByTitle[$milestone.title] = $milestone
}

foreach ($title in $config.milestones) {
  if ($milestoneByTitle.ContainsKey($title)) {
    Write-Host "  exists: $title"
    continue
  }

  $created = Invoke-GitHub -Method "POST" -Uri "$baseUri/milestones" -Body @{
    title = $title
    state = "open"
  }
  $milestoneByTitle[$title] = $created
  Write-Host "  created: $title"
}

Write-Host "Loading existing issues..."
$existingIssues = Get-AllPages "$baseUri/issues?state=all"
$issueByTitle = @{}
foreach ($issue in $existingIssues) {
  if (-not $issue.pull_request) {
    $issueByTitle[$issue.title] = $true
  }
}

Write-Host "Creating issues..."
foreach ($issue in $config.issues) {
  if ($issueByTitle.ContainsKey($issue.title)) {
    Write-Host "  exists: $($issue.title)"
    continue
  }

  $milestoneNumber = $null
  if ($issue.milestone -and $milestoneByTitle.ContainsKey($issue.milestone)) {
    $milestoneNumber = $milestoneByTitle[$issue.milestone].number
  }

  $body = @{
    title = $issue.title
    body = $issue.body
    labels = @($issue.labels)
  }

  if ($null -ne $milestoneNumber) {
    $body.milestone = $milestoneNumber
  }

  $created = Invoke-GitHub -Method "POST" -Uri "$baseUri/issues" -Body $body
  Write-Host "  created #$($created.number): $($issue.title)"
}

Write-Host "Done."
