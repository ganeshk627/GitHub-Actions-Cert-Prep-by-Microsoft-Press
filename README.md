# REAME.md

# 1. Trigger Custom Workflows

## What is Github?
* Collaborative developer platform
* Public and private repositories
* Free, Pro, Team, Enterprise
* Home of GitHub Copilot (X)
* Source code control
* C|/CD automation
* Package management
* Collaboration

## What is Github Actions?
* Depends on the context :)
* GitHub Actions refers to the entire platform and ecosystem for creating and running automated workflows within the GitHub environment
* An action is a script invoked from within a workflow

## What are workflows?
* Automated scripts (actions) that run when specific events occur in your repository
* Efficient way to automate development tasks
* Common use cases:
    * C|/CD
    * Versioning and release management
    * Automation and notifications

## GitHub workflow event types

* Push events - When you push your code into a branch in GitHub, that push and related commit are events that can trigger workflows.
* Pull request events - When you create a pull request, that's an event that can trigger workflows
* Issue events - When you create an issue, that's an event that can trigger workflows
* Release events - When you create a release, that's an event that can trigger workflows
* Workflow dispatch events (manual)
* Scheduled events (cron)
* Webhook events (external services)

## 1.1 Configure workflows to run for one or more events

* Trigger workflow when commit is pushed
* Workflow runs when a new commit is pushed to a specific branch or repository
* Use cases:
    * Running tests after every push
    * Deploy code and infrastructure to staging environment
```yml
# Workflow runs when a new commit is pushed to a specific branch or repository
# Use cases:
# Running tests after every push
# Deploy code and infrastructure to staging environment
on :
    push:
        branches:
            - main
            - develop
```

## 1.2 Configure workflows to run for scheduled events

* Schedule-based workflow
* Workflows run automatically at specific times or intervals
* Use cases:
    * Running nightly builds
    * Performing hourly backups
```yml
on :
    schedule:
        - cron: '0 0***'    # Every day at midnight
```

## 1.3 Configure workflows to run for manual events
* Manual workflows
* Workflow runs only when manually triggered by a
user
* Use cases:
    * Deploying to a production environment
    * Running a one-time automation script

```yml
on:
    workflow_dispatch:
```

## 1.4 Configure workflows to run for webhook events
* Webhook-triggered workflows
* Workflow runs when triggered by an external event from another service
* Use cases:
    * Triggering a build when a new issue is created on GitHub
    * Deploying code to a server when a new version is released
```yml
on:
    webhook:
        url:https://example.com/my-webhook
```

## 1.5 Demonstrate a GitHub event to trigger a workflow based on a practical use case

* __Scenario:__ Automatically deploy a website to Netlify every time a new commit is pushed to the main branch
* __Implementation:__ Push a new workflow to the GitHub repo; whenever you push a new commit to main, the workflow will automatically deploy the website to Netlify
* __Workflow:__ 
```yaml
on:
    push:
        branches: [main]

jobs:
    deploy:
        runs-on: ubuntu-latest

        steps:
            - uses: actions/checkout@v3
            - name: Install dependencies
              run: npm install
            - name: Build website
              run: npm run build
            - name: Deploy to Netlify
              uses: netlify/actions/cli@v1.1
              with:
                site_id: <site_id>
                api_key: <api_key>
                args: deploy --prod
```

* __Explanation:__ In this example, that Netlify example, we're saying that whenever a push or a commit happens on main, we're then going to kick off these jobs. This job will deploy on cloud servers. They're actually called runners. That's a term you should know for your exam. Runners are GitHub hosted cloud-based VMs, and that army of virtual machines, you can choose from among them, depending upon what your use case and requirements are. There's Windows, Mac OS, and Linux runners to choose from. This example says take the latest Ubuntu distribution. And then each job consists of steps that involve references to GitHub Actions. This is the checkout@v3 action where it's doing an NPM install and a build. And then the second step here, we're using the Netlify CLI version 1.1 action to specify your API key and site ID and which environment you're deploying to. And that's everything to it. Now you would have your site ID and key protected as secrets in your repo. We'll get to all of that in the demos in due time throughout this training course. We never, ever want to have an exposed API key or password and I wouldn't even want to necessarily expose my site ID in plain text in your repo. You want to keep those as secrets and then call them, but this code at least gives us something to start with.


# 2. Utilize Workflow Components





# Reference Links

[Automate development tasks by using GitHub Actions](https://learn.microsoft.com/en-us/training/modules/github-actions-automate-tasks/2b-identify-components-workflow)

https://docs.github.com/en/actions

https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows

https://github.com/marketplace?query=sort%3Amatch-desc&type=actions


