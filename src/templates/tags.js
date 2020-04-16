import React from "react"

import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Bio from "../components/bio"

const Tags = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const siteTitle = data.site.siteMetadata.title
  const tagHeader = `${tag}`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={tagHeader} />
      <h3>{tagHeader}</h3>
      {/* links */}
      <div 
        style={{ 
          display: `flex`,
          flexWrap: `wrap`,
          listStyle: `none`,
          padding: 0,
          flexDirection: `column`
        }}>
        <p>→ 
          <Link style={{ boxShadow: `none` }} to={'/posts'}>
          Notes
          </Link>
        </p>
      </div>
      <ul>
        {edges.map(({ node }) => {
          const { slug } = node.fields
          const { title } = node.frontmatter
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
              <br/>
              <small>{node.frontmatter.date} • <span role="img" aria-label="coffee">☕</span> {node.frontmatter.minread} min read</small>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            minread
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`