import React from 'react'
import Section from './Section'

const Intro = () => (
  <Section title="AI Data Miner">
    <p>AI Data Miner is an AI agent that extracts data from different types of files on your computer based on specified criteria, processes and structures the extracted data, and compiles it into a single file or database table. To use AI Data Miner, you need to select the files to be analyzed and define the exact criteria for data extraction and formatting. The AI reads each file, extracts relevant data, and organizes it into a structured CSV file with predefined columns. Additionally, it can optionally store the data in a database table, helping you consolidate scattered information from multiple files.</p>
    <p>For example, you can program AI Data Miner to save the invoice numbers and total amounts of your invoices stored as PDF files in different formats and even languages ​​into a single CSV file or database table. You can transfer the data in the desired columns from your employee inventory on multiple Microsoft Excel files into a single file, or you can create your own inventory by scanning all the CVs on your computer and collecting the desired candidate information from all the job applications sent to you into a single file.</p>
  </Section>
)

export default Intro
