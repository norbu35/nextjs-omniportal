<!--toc:start-->

- [I. Introduction](#i-introduction)
- [II. Project Overview](#ii-project-overview)
- [III. Website Features and Sections](#iii-website-features-and-sections)
- [IV. Website Structure and Navigation](#iv-website-structure-and-navigation)
- [V. Content Strategy](#v-content-strategy)
- [VI. User Experience (UX) Design](#vi-user-experience-ux-design)
- [VII. Technology and Development](#vii-technology-and-development)
- [VIII. Project Management and Timeline](#viii-project-management-and-timeline)
- [IX. Budget and Monetization](#ix-budget-and-monetization)
- [X. Conclusion](#x-conclusion)
<!--toc:end-->

## I. Introduction

### Purpose of the Document

The purpose of this document is to be a comprehensive guide for the structure and development of this Project.
It will contain the key planning points, core sections and features, and an estimate of a timeline to implement these sections.

The planning points will include reasoning behind the choice of a Tech Stack, it's advantages and drawbacks, and how the Tech Stack
will be used to implement the core features. The timeline will give a rough estimate of the working tempo and an overview of how long
the project might take to complete.

This Document will be updated continuously and will reflect the progress of the Project.

### Overview of the MonHub Internet Portal Project

There lacks a comprehensive website to act as a unified source of information. As Mongolia is a small country with a small population,
such a unified website could be of great use for many people when they need to easily find various kinds of information on the internet.

Today, people mainly go to Facebook to find telephone numbers, information about websites and to find an aggregation of recent news.
As much as Facebook is a source for a broad spectrum of topics, it is very unstructured, unmoderated and too broad, which leads to
inefficient search and lots of out-of-date and wrong information.

Another source of search might be Google, but because of the lack of SEO best practices of domestic websites and also the lack of an
official online language (many people mix cyrillic and romanized mongolian), doing an efficient search on Google is usually not the easiest.

By having a moderated and domestically tailored information aggregator website, it will be much easier for people to find what they are looking for.

## II. Project Overview

### Project Goals and Objectives

The goal of the website is to function as the starting point for Mongolians when they go on the web. As of now, many people use Google
as the start page for their browser. Whenever they need to find some information, they need to make a Google search on the whole of the Internet.
This presents a couple of problems:

- The user doesn't always know how to prompt their search. They might be looking for a shop but don't know the name of it, and so can't make a
  Google search by the name of the shop. When they try to search for a description of the shop, they might not be technically adept to make an
  efficient query.
- Even if they have an idea of what to query, there is a language issue. Many Mongolians mix cyrillic and romanized Mongolian. Mostly Google
  does a good job of converting romanized Mongolian, but it is not optimal and may not return accurate results.
- Many domestic websites don't implement SEO best practices, so Google may not be efficient.
- Much of the Open Graph information may be out of date.

As Mongolia is a small country, Mongolian users usually look for a limited number of types of information. As the information to be aggregated is
of manageable size, it will be possible and more efficient to aggregate all the information on one 'starting point of the web'. There are plenty of
international such Portal Websites, for example Yahoo.com and MSN.com, although these sites are on english and are not accessible for the majority of
Mongolians.

### Target Audience Analysis

The main target of audience will be the less technically adept, older Mongolians with no or limited English who have difficulty navigating the Internet.
Although websites to find information is plenty on the Internet, almost all of them are in English, so having a one stop site with all the essential
information will help the users who are not able to utilize these other websites.

## III. Website Features and Sections

### Core Features and Functionalities

The website will be divided into the following sections:

- Information aggregation:

  - Contact Information:

    - Government organs
    - Healthcare
    - Shops
    - Events

  - A unified list of:

    - Search engines
    - Online shops
    - News websites
    - Ad websites (Trading and Jobs)

- Utility tools:

  - Recent news aggregator
  - Weather information
  - Calculator, unit converter, currency converter, calendar, note taking
  - File upload

- Community:

  - Message board
  - Profile

Some core functionalities will include:

- Customization:
  - Users will be able to change the appearance and the theme of the website, and also choose which widgets should appear. Their settings will be stored
    on the database and be able to be retrieved with through an OAuth login.
- User profile:
  - Users will be able to login and create a public profile if they wish to. Their user profile will be stored on the database along with their website
    settings, information they wish to publicize, and metadata to enable file uploads and retrieval from AWS S3.

## IV. Website Structure and Navigation

- Site Map Development

### Navigation Design and Usability Considerations

To begin with, the page will be a Single Page Application (SPA) which includes the Information Aggregation section divided into widgets.
The widgets will be:

- Information Aggregation:

  - Contact Information
  - Weather
  - News Aggregator

- Utilities:

  - Calculator
  - Calendar
  - Currency Converter
  - Note taking

## V. Content Strategy

- Types of Content to be Provided
- Content Creation Plan

## VI. User Experience (UX) Design

- Visual Design and Branding Guidelines
- Responsive Design Principles

## VII. Technology and Development

### Technology Stack Selection

The Technology Stack to be used will be:

- Frontend:

  - Next.js
  - Redux
  - MUI

- Backend:

  - Node
  - PostreSQL

- Infrastructure:

  - File hosting on AWS S3
  - Server hosted on AWS EC2
  - Database stored on AWS RDS

Next.js is chosen as the website will be heavily reliant on a customizable and styled, interactive UI. Redux will be used to store the state of the
UI customization.

Node will be the primary backend environment to keep the stack streamlined with JavaScript, and PostreSQL will be the database to store user information,
message board, ads section, and community section data.

### Development Approach

The tech stack will be learnt as the project progresses. First, the main design of the website and the information aggregation section will be completed
so that the website is usable to find information while the rest of the functionalities are developed. After that, the customization will be implemented.
The community section, along with the file upload functionality will be implemented last, as these are not the essential parts of the website and will
also require more research and time.

Things to consider:

- Should everything be divided into widgets on a SPA, or
- Should the website be divided into routes (Information Aggregation / Community / Widgets)

### Technical Requirements and Infrastructure

Cloud Computing will be needed to operate some sections of the website. As the website is developed and the Community section and file hosting services
are implemented, AWS will be used to host the files and store the database.

## VIII. Project Management and Timeline

- Project Plan and Milestones
- Task Management and Monitoring

## IX. Budget and Monetization

- Project Budget Considerations

## X. Conclusion

- Recap of Key Points
- Next Steps in the Project
