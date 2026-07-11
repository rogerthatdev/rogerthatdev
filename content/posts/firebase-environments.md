+++
date = '2026-07-10T07:04:11-0800'
draft = false
title = 'Environments in Firebase: From Prototype to Production'
tags = ["firebase", "101", "app deployment"]
+++

These days, anyone can be a builder. With agentic AI assistants and app platforms like Firebase, it’s easy to go from prototype to deployment in no time at all. But if you want your million-dollar app idea to someday scale in a secure way, you’ll eventually need to think about how you’re going to separate your live production environments from your prototyping and development resources.

### One app and two projects (at least)

Every Firebase app should have at least two environments: **one production (prod)** and **at least one pre-production (pre-prod)**. Prod is for the live show and pre-prod is for rehearsals, dress rehearsals and dry runs. Pre-prod environments allow you to experiment, explore and make mistakes without impacting what users are seeing or any data that matters. Even if you’re doing local development with the Firestore Emulator Suite, it’s important to have a pre-prod environment deployed on Google Cloud too.  

Firebase outlines three specific types of environments that can constitute pre-prod**.** Your application and needs will determine which ones you’d want to set up:

* **Development projects:** safe isolated environments to test changes as they’re being built by individual developers.  
* **Test/QA projects:** safe isolated environments for automated testing.  
* **Staging projects:** safe isolated environment that mirrors prod infrastructure as closely as possible. A staging environment serves as a preview before release.

| |
| :---- |
| *Ask Gemini in Firebase: “Recommend the pre-prod environments I should set up for my application”* |
| |

Having a pre-prod environment is not only a best practice for keeping changes to prod under control, but it will also help separate billing, resource utilization, and analytic info associated with prod squarely away from those of testing and experimentation. 

### Multiple environments and one codebase

Just as your prod and pre-prod environments are strictly separated into isolated projects, your application code will be separate too, except it will be within the same GitHub repository. The `main` branch will be for your prod deployment. Determining what other branches correspond with your environments will depend on your **deployment pipeline:** the manual and automated processes that determine how changes move from one environment to the next until finally reaching prod.

A deployment pipeline can be very complex and sophisticated depending on the application code it’s meant to deploy. For a mature engineering team, a deployment pipeline will include automated testing and checks that submitted code must pass. Processes like these are managed by CI/CD solutions like GitHub Actions, BuildKite, or Cloud Build. Even for smaller teams or single-builder projects it’s a good idea to have a pipeline in place, even a simple one. For example, Firebase App Hosting supports GitHub integration that automatically deploys every time you push a commit to a specific branch, so at the very least, you can have a pipeline like this:

* Build a new feature in branch `feature-a`  
* Submit pull request to `main` branch  
* Pull request triggers the deployment pipeline that runs through tests  
* When all tests pass, Firebase App Hosting on the staging project deploys to a URL  
* Pull request reviewer reviews code and staged deployment  
* Pull request is approved and change is merged to `main`

This is by no means a robust, sophisticated, or even adequate deployment pipeline, but for a single-person project it’s a good place to start. It could take some effort to configure and set up securely, but it’s something you can expand and improve as you develop your application.

### One more project

Managing a single Firebase project through the console seems simple enough, but that’s not something that will scale very well when you have to manage multiple projects that need to be exactly the same in some ways, and configured differently in other ways. This is especially true if you’re going to deploy other Google Cloud services to work with your Firebase application. In addition to your pre-prod and prod Firebase projects, you may also want to have a separate all-knowing **infrastructure project**. This is a special project that manages the resources in your pre-prod and prod projects using an infrastructure-as-code solution like Terraform. A single infrastructure project can also serve as the centralized hub for managing all shared resources and collecting aggregate monitoring data for your entire application stack. Having a project like this will help ensure that all resources for each environment associated with your application are configured cleanly in a single place. And because the infrastructure is written as code, the consistent configuration can be hard-coded values and the configuration values that change between environments can be variables. 
