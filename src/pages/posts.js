import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const Posts = ({ data, location }) => {
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
      <SEO title="Index" />
      <div style={{  }}>
        <h3>Notes</h3>
      </div>
      <p>
        This page shares my notes on <Link style={{  }} to={'/tags/programming'}>programming</Link>, business, finance, <Link style={{  }} to={'/tags/technology'}>technology</Link>, and <Link style={{ }} to={'/tags/reading'}>reading</Link>.
      </p>

      {/* links */}
      <div 
        style={{ 
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}>
        <p style={{marginBottom:'0em'}}>→ 
          <Link style={{  }} to={'/posts-by-date'}>
          Notes by date
          </Link>
        </p>
      </div>

      <ul>
      {/* posts */}
      {Object.entries(tagPostData).map(([key, value]) =>{
        const formattedHeader = key.slice(0,1).toUpperCase() + key.slice(1, key.length)
        const posts = value.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          const slug =  node.fields.slug
          
          return (
            <ol key={slug}>
              <Link to={slug}>{title}</Link>
              <br/>
              <small>{node.frontmatter.date} • {node.frontmatter.minread} min read <span role="img" aria-label="coffee">☕</span> </small>
            </ol>
          )
          })
          return (
            <div>
              <h3
                style={{}}
              >
                {formattedHeader}
              </h3>
              {posts}
            </div>
          )
      })}
      </ul>
    </Layout>
  )
}
  
export default Posts

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { type: { in: ["blog"] } } }
    ) {
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
            tags
            minread
          }
        }
      }
    }
  }
`
