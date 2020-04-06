---
title: Build and deploy your own blog with ease using GatsbyJS and GH Pages
date: "2015-05-28T22:40:32.169Z"
description: Learn how to build your own blog using GatsbyJS and Gatsby Blog Starter.
minread: "2"
---

I recently rebuilt my website using a scalable architecture, leveraging some of the
more popular technologies (Flask, Docker, React) to enable me to host multiple applications
under the same deployment (post about that incoming). One of these applications is the blog you're reading now, built with
Gatsby JS, and it's super easy to do! Let me show you...

### What is GatsbyJS?

[Gatsby]() is a React-based static site generator, powered by [GraphQL](). It weaves together parts of React - 
specifically webpack, react-router, GraphQL (among others) - into an easy to use development framework.
The term static site generator may be a bit misleading, Gatsby is far more like a modern front-end framework
and can be used to build progressive web apps.

It uses powerful preconfiguration to build a website that uses only static files for incredibly fast page loads, 
service workers, code splitting, server-side rendering, intelligent image loading, asset optimization, and data prefetching - all out of the box. 

After writing your code Gatsby transforms it into a directory with a single HTML file and your static assets and this folder is uploaded to your hosting provider - voila.

### Introducing Gatsby Starter Blog

There are tons of pre-built Gatsby templates available to be cloned from github offering you the chance to build 
and deploy faster. In order to create our blog we're going to use [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog), giving us a pre-built blog template that can be modified as we please. This template uses markdown files as blog posts, auto generating
pages (and slugs) for each of the 'posts'. GraphQL is leveraged to query the static files for each of the requested items, resulting in a super fast final product. 

### Getting started

To get started you'll want to install gatsby.
``` 
npm install gatsby
```


Now clone down the gatsby-starter-blog repo.
``` 
gatsby new my-blog-starter https://github.com/gatsbyjs/gatsby-starter-blog
```


Fire up the site and start developing
```
cd my-blog-starter/
gatsby develop
```

You'll notice in the terminal the site is running at http://localhost:8000, and you can also access http://localhost:8000__graphql to practice
querying your data using GraphQL.

### Some pointers

- This however showed weasel
- Well uncritical so misled
- Well uncritical so misled

### Deploying to GH pages (for free)


``` jsx
let Rectangle = {
  resizeTopLeft(position, size, preserveAspect, dx, dy) {
    // 10 repetitive lines of math
  },
  resizeTopRight(position, size, preserveAspect, dx, dy) {
    // 10 repetitive lines of math
  },
  resizeBottomLeft(position, size, preserveAspect, dx, dy) {
    // 10 repetitive lines of math
  },
  resizeBottomRight(position, size, preserveAspect, dx, dy) {
    // 10 repetitive lines of math
  },
};

let Oval = {
  resizeLeft(position, size, preserveAspect, dx, dy) {
    // 10 repetitive lines of math
  },
  resizeRight(position, size, preserveAspect, dx, dy) {
    // 10 repetitive lines of math
  },
  resizeTop(position, size, preserveAspect, dx, dy) {
    // 10 repetitive lines of math
  },
  resizeBottom(position, size, preserveAspect, dx, dy) {
    // 10 repetitive lines of math
  },
};

let Header = {
  resizeLeft(position, size, preserveAspect, dx, dy) {
    // 10 repetitive lines of math
  },
  resizeRight(position, size, preserveAspect, dx, dy) {
    // 10 repetitive lines of math
  },  
}

let TextBlock = {
  resizeTopLeft(position, size, preserveAspect, dx, dy) {
    // 10 repetitive lines of math
  },
  resizeTopRight(position, size, preserveAspect, dx, dy) {
    // 10 repetitive lines of math
  },
  resizeBottomLeft(position, size, preserveAspect, dx, dy) {
    // 10 repetitive lines of math
  },
  resizeBottomRight(position, size, preserveAspect, dx, dy) {
    // 10 repetitive lines of math
  },
};
```