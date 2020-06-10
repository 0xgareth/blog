// Gatsby supports TypeScript natively!
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <div
      style={{
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Layout location={location} title={siteTitle}>
        <SEO title="Home" />
      </Layout>
    </div>
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
  }
`
