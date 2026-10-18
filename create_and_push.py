import subprocess
import urllib.request
import json
import sys

# 1. Retrieve GitHub token from Git credential helper
p = subprocess.Popen(['git', 'credential', 'fill'], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
stdout, stderr = p.communicate('protocol=https\nhost=github.com\n\n')
token = ''
username = 'mohamedsimam'
for l in stdout.splitlines():
    if l.startswith('username='):
        username = l.split('=', 1)[1]
    elif l.startswith('password='):
        token = l.split('=', 1)[1]

if not token:
    print('Error: GitHub token not found in git credentials')
    sys.exit(1)

print(f'Retrieved credentials for user: {username}')

repo_name = 'the-infinity-creators-math-club'
repo_desc = 'Official website for The Infinity Creators MATH CLUB — KM/KM/ Al-Ashraq MMV (National School), Nintavur'

# 2. Check if repository already exists or create it
headers = {
    'Authorization': f'Bearer {token}',
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'InfinityCreators-Setup',
}

repo_url = f'https://api.github.com/repos/{username}/{repo_name}'
check_req = urllib.request.Request(repo_url, headers=headers)
repo_exists = False

try:
    with urllib.request.urlopen(check_req) as resp:
        if resp.status == 200:
            repo_exists = True
            print(f'Repository {repo_name} already exists on GitHub.')
except urllib.error.HTTPError as e:
    if e.code == 404:
        repo_exists = False
    else:
        print(f'HTTP error checking repo: {e}')
        sys.exit(1)

if not repo_exists:
    print(f'Creating repository {repo_name} on GitHub...')
    payload = json.dumps({
        'name': repo_name,
        'description': repo_desc,
        'private': False,
        'has_issues': True,
        'has_projects': True,
        'has_wiki': True,
        'auto_init': False,
    }).encode('utf-8')
    create_req = urllib.request.Request(
        'https://api.github.com/user/repos',
        data=payload,
        headers=headers,
        method='POST'
    )
    try:
        with urllib.request.urlopen(create_req) as resp:
            data = json.loads(resp.read().decode())
            print(f"Successfully created GitHub repo: {data['html_url']}")
    except Exception as e:
        print(f'Failed to create GitHub repository: {e}')
        sys.exit(1)

# 3. Git add, commit, and push
def run_cmd(cmd):
    print(f'Running: {" ".join(cmd)}')
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.stdout:
        print(res.stdout)
    if res.stderr:
        print(res.stderr)
    if res.returncode != 0:
        raise RuntimeError(f'Command failed with code {res.returncode}')

run_cmd(['git', 'add', '.'])
# Check if there are changes to commit
status_res = subprocess.run(['git', 'status', '--porcelain'], capture_output=True, text=True)
if status_res.stdout.strip():
    run_cmd(['git', 'commit', '-m', 'Initial commit: The Infinity Creators Math Club website with Netlify support'])

remote_url = f'https://github.com/{username}/{repo_name}.git'

# Set or update remote
remotes = subprocess.run(['git', 'remote'], capture_output=True, text=True).stdout.split()
if 'origin' in remotes:
    run_cmd(['git', 'remote', 'set-url', 'origin', remote_url])
else:
    run_cmd(['git', 'remote', 'add', 'origin', remote_url])

print(f'Pushing to {remote_url} on branch main...')
# Use token directly in authenticated push URL or rely on credential manager
auth_remote_url = f'https://{username}:{token}@github.com/{username}/{repo_name}.git'
res = subprocess.run(['git', 'push', '-u', auth_remote_url, 'main'], capture_output=True, text=True)
if res.returncode == 0:
    print(f'SUCCESS! Project completely pushed to https://github.com/{username}/{repo_name}')
else:
    print('Standard push output:', res.stdout, res.stderr)
    # Fallback to standard git push if auth URL had an issue
    run_cmd(['git', 'push', '-u', 'origin', 'main'])

print(f'Repository URL: https://github.com/{username}/{repo_name}')
