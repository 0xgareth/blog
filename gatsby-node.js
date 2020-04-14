const path = require(`path`)
const kebabCase = require(`lodash.kebabcase`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // build posts pages
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  // build tags pages
  let tags = []  
  posts.forEach((post, _) => {
    if (post.node.frontmatter.tags) {
      tags = tags.concat(post.node.frontmatter.tags)
    }
  })
  const getUnique = arrArg => {
    return arrArg.filter((elem, pos, arr) => {
      return arr.indexOf(elem) == pos
    })
  }
  tags = getUnique(tags)

  const tagTemplate = path.resolve(`./src/templates/tags.js`)
  
  tags.forEach(tag => {
    createPage({
      path: `/tags/${kebabCase(tag)}/`,
      component: tagTemplate,
      context: {
        tag,
      },
    })
  })


  // Iterate over categories and create page for each
  // uniqueTags.forEach(tag => {
  //   reporter.info(`Creating page: category/${category}`)
  //   createPage({
  //     path: `category/${category}`,
  //     component: require.resolve("./src/templates/CategoryList.js"),
  //     // Create props for our CategoryList.js component
  //     context: {
  //       category,
  //       // Create an array of ids of articles in this category
  //       ids: allMarkdownRemark.edges
  //         .filter(({ node }) => {
  //           return node.frontmatter.categories.includes(category)
  //         })
  //         .map(({node}) => node.id),
  //     },
  //   })
  // })
}

// const getUniqueTags = allMarkdownRemark => {
//   const uniqueTags = new Set()
//   // Iterate over all articles
//   allMarkdownRemark.edges.forEach(({ node }) => {
//     // Iterate over each category in an article
//     node.frontmatter.tags.forEach(tag => {
//       uniqueTags.add(tag)
//     })
//   })
//   // Create new array with duplicates removed
//   return Array.from(uniqueTags)
// }

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
