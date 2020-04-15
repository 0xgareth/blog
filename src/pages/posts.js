import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Bio from "../components/bio"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  let tagPostData = {}
  const siteTitle = data.site.siteMetadata.title
  const posts     = data.allMarkdownRemark.edges
  
  // get all unique tags from each post
  let tags = []
  posts.forEach((post, _) => {
    if (post.node.frontmatter.tags) {
      tags = tags.concat(post.node.frontmatter.tags)
    }
  })

  const getUnique = arrArg => {
    return arrArg.filter((elem, pos, arr) => {
      return arr.indexOf(elem) === pos
    })
  }

  tags = getUnique(tags)

  const getPostsWithTag = (posts, tag) => {
    let res = []
    posts.forEach((post, _)=> {
      if (post.node.frontmatter.tags.includes(tag)) {
        res.push(post)
      }
    })
    return res;
  }

  // build a data structure to hold tags : posts
  tags.forEach(tag => {
    tagPostData[tag] = getPostsWithTag(posts, tag);
  })

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio location={location}/>
      
      {/* links */}
      <div 
        style={{ 
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}>
        <Link style={{ boxShadow: `none` }} to={'/posts-by-date'}>
         Posts by date
        </Link>
        {Object.keys(tagPostData).map((tag) => {
          const path = tag.toLowerCase()
          return( 
            <Link style={{ boxShadow: `none` }} to={`/tags/${path}`}>
             {tag}
            </Link>
          )
        })}
      </div>
      <ul>
      {/* posts */}
      {Object.entries(tagPostData).map(([key, value]) =>{
        const posts = value.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          const slug =  node.fields.slug
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
              <br/>
              <small>{node.frontmatter.date} • <span role="img" aria-label="coffee">☕</span> {node.frontmatter.minread} min read</small>
            </li>
          )
          })
          return (
            <div>
              <h3
                style={{}}
              >
                {key}
              </h3>
              {posts}
            </div>
          )
      })}
      </ul>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            minread
            tags
          }
        }
      }
    }
  }
`
