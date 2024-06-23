# REAME.md

# 101 Getting Started

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

# 1. Trigger Custom Workflows

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

### Creating Workflows
1. Create new repository or use existing
2. Click __'Actions'__ and select __'Configure'__ for Simple Workflow
3. Now the blank.yml created under '.github/workflows/' as below
```yml
# This is a basic workflow to help you get started with Actions

name: CI

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the "main" branch
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v4

      # Runs a single command using the runners shell
      - name: Run a one-line script
        run: echo Hello, world!

      # Runs a set of commands using the runners shell
      - name: Run a multi-line script
        run: |
          echo Add other actions to build,
          echo test, and deploy your project.
```

> _Note 1_: Workflows(.yml) file can be created under '.github/workflows/*.yml'

> _Note 2_: *.yml file is actually intent or space sensitive, so we should use intent as 2 or more




# 2. Utilize Workflow Components

## 2.1 Identify the correct syntax for workflow jobs
### Workflow Jobs
* Purpose
    * Define units of work that execute specific tasks within a workflow.
* Elements
    * __jobs__: declares a job
    * __job_name__: unique name for the job (!what if we give same name for multiple jobs)
    * __runs-on__: specifies the environment where the job will run (e.g., ubuntu-latest, windows-latest, self-hosted runner name) 
    * __steps__: list of steps to be executed within the job
### Workflow Model
- >Workflow
    - >Jobs
        - >Steps
            - >Actions

> _Note_: All the jobs are executed in parralled if there are no dependency.

## 2.2 Use job steps for actions and shell commands
### Job Steps
* Purpose
    * Define individual tasks to be executed within a job
* Elements
    * __steps__: to declare steps within a job
    * __uses__ (Optional): use a pre-build action from the GitHub Actions marketplace 
    * __action_name__: name of the action to use
    * __version__ (Optional): specific version of the action to use
    * __with__ (optional): input values for the action
    * __name__ (optional): custom name for the step
    * __run__: execute a shell command within the step

### Example: Job Steps
```yml
# This is a basic workflow to help you get started with Actions
name: Example Workflow for Job Steps 
on:
    push:
        branches:
            - main
jobs:
    example_job:
        runs-on: ubuntu-latest
        steps:
        - name: Checkout Repository # name: Custom name for the step 
          uses: actions/checkout@v2 # uses: Use a pre-built action
        - name: Set up Node. js # name: Custom name for the step 
          uses: actions/setup-node@v2 # action_name: Name of the action to use 
          with: # with: Input values for the action
            node-version: '14'
        - name: Install Dependencies # name: Custom name for the step 
          run: npm install # run: Execute a shell command within the step
        - name: Run Tests # name: Custom name for the step
          run: npm test # command_to_execute: Shell command to be executed
```

## 2.3 Use conditional keywords for steps
### Conditional Statements
* Purpose
    * Control the execution of steps based on specific conditions
* Keywords
    * if: execute a step only if a condition is true
    * else: execute a step if the if condition is false
    * needs: specify that a step depends on another job completing
    
### Example: Conditional jobs
```yml
# This is a basic workflow to help you get started with Actions
name: Conditional Jobs

# Controls when the workflow will run
on:
  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
    initial-job:
        runs-on: ubuntu-latest
        steps:
        - name: Checkout Repository
          uses: actions/checkout@v2
        - name: Run a command
          run: echo "This is the initial job."

    conditional-job:
        needs: initial_job # This job depends on the completion of 'initial_job'
        runs-on: ubuntu-latest
        steps:
        - name: Execute on specific condition
          run: echo "This step runs because the condition is true."
          if: github.ref == 'refs/heads/main' # Condition to check if branch is 'main'
        - name: Alternative step for false condition
          run: echo "This step would run if the above condition was false."
          if: github.ref != 'refs/heads/main' # This condition is opposite of the above

```


## 2.4 Describe how actions, workflows, jobs, steps, runs, and the marketplace work together
### GitHub Actions vocabulary review
* __Workflow__ : Overall automation script defined in a YAML file
* __Jobs__ : Units of work within a workflow, each with its own steps
* __Steps__ : Individual tasks within a job, executed using actions or shell commands
* __Actions__ : Pre-built scripts that provide reusable functionality which will get from GitHub actions marketplace.
* __Shell commands__ : Custom scripts written to perform specific tasks
* __Runs__: Specific executions of a workflow triggered by events
* __Marketplace__ : Central repository for discovering and sharing
actions


## 2.5 Identify scenarios suited for using GitHub-hosted and self-hosted runners

### GitHub Actions runners
1. GitHub-hosted runners
    * Free to use
    * Limited resources available
    * Pre-configured with commonly used software
    * Suitable for simple workflows and open-source projects
2. Self-hosted runners
    * More control over the environment
    * Can be used to run workflows on specific hardware or software
    * Require more maintenance

>___Note___: If you have some maybe special-er cases or edgier cases for automation, you may find that the GitHub-hosted runners don't have that version of a library that you need or don't have a library, and because you can't touch those Cloud machines too much, you may be forced to do it yourself with a self-hosted runner.

## 2.6 Implement workflow commands as a run step to communicate with the runner

### Workflow commands
* Purpose
    * Interact with the runner during workflow execution
* Commands
    * set-output: Store a value for subsequent steps
    * upload-artifact: Upload an artifact to be used in other workflows
    * download-artifact: Download an artifact uploaded in another workflow
    * echo: Print a message to the workflow logs

### Example: Workflow commands
```yml
name: Workflow Commands
.
.
.
steps:
    - name: Set output
    run: echo "My output is: SMY_VARIABLE"
    - name: Upload artifact
    uses: actions/upload-artifact@v3
    with:
        name: my-artifact
        path: /path/to/artifact
    - name: Download artifact
    uses: actions/download-artifact@v3
    with:
        name: my-artifact
        path: /path/to/download
```

## 2.7 Demonstrate the use of dependent jobs
### Dependent Jobs
* Purpose
    * Ensure specific tasks are executed in a specific order
* Benefits
    * Improved workflow control and execution flow
    * Prevent errors or inconsistencies by guaranteeing specific tasks are completed before others
    * Useful for scenarios with dependencies between tasks
### Example: Dependent Jobs
```yml
.
.
.
jobs:
    build:
        runs-on: ubuntu-latest 
        steps:
            - uses: actions/checkout@v3
            - run: npm install
            - run: npm run build
            - name: Upload build artifact
              uses: actions/upload-artifact@v3 
              with:
                name: build
                path: /path/to/build
    deploy:
        needs: build
        runs-on: ubuntu-latest
        steps:
            - uses: actions/download-artifact@v3
              with:
                name: build
                path: /path/to/build
            - run: ./deploy.sh
```






# Reference Links

[Automate development tasks by using GitHub Actions](https://learn.microsoft.com/en-us/training/modules/github-actions-automate-tasks/2b-identify-components-workflow)

https://docs.github.com/en/actions

https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows

https://github.com/marketplace?query=sort%3Amatch-desc&type=actions


