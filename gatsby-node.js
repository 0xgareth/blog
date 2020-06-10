const path = require(`path`)
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
          filter: { frontmatter: { type: { in: ["blog"] } } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
                type
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

  // Create blog posts pages.
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
      path: `/tags/${tag}/`,
      component: tagTemplate,
      context: {
        tag,
      },
    })
  })

  // book notes pages
  const book = path.resolve(`./src/templates/books.js`)
  const bookResult = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
          filter: { frontmatter: { type: { in: ["book"] } } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                genre
                type
              }
            }
          }
        }
      }
    `
  )

  if (bookResult.errors) {
    throw bookResult.errors
  }

  // Create blog books pages.
  const books = bookResult.data.allMarkdownRemark.edges

  books.forEach((post, index) => {
    const previous = index === books.length - 1 ? null : books[index + 1].node
    const next = index === 0 ? null : books[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: book,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  // build book genre pages
  let genres = []  
  books.forEach((post, _) => {
    if (post.node.frontmatter.genre) {
      genres = genres.concat(post.node.frontmatter.genre)
    }
  })

  genres = getUnique(genres)

  const genreTemplate = path.resolve(`./src/templates/genres.js`)
  
  genres.forEach(genre => {
    createPage({
      path: `/genre/${genre}/`,
      component: genreTemplate,
      context: {
        genre,
      },
    })
  })

}

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
