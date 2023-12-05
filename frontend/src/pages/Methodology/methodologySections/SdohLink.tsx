import KeyTerms from '../methodologyComponents/KeyTerms'
import Resources from '../methodologyComponents/Resources'
import {
  sdohDataSources,
  sdohDefinitionsArray,
} from '../methodologyContent/SdohDefinitions'
import { PDOH_RESOURCES } from '../../WhatIsHealthEquity/ResourcesData'
import { Helmet } from 'react-helmet-async'
import DefinitionTooltip from '../methodologyComponents/DefinitionTooltip'
import { definitionsGlossary } from '../methodologyContent/DefinitionGlossary'
import {
  percentShareTooltip,
  totalCasesPer100kPeopleTooltip,
} from '../methodologyContent/TooltipLibrary'
import { CodeBlock } from '../methodologyComponents/CodeBlock'
import { Alert, AlertTitle } from '@mui/material'
import StripedTable from '../methodologyComponents/StripedTable'
import { DATA_CATALOG_PAGE_LINK } from '../../../utils/internalRoutes'
import { DATA_SOURCE_PRE_FILTERS } from '../../../utils/urlutils'

export const missingAhrDataArray = [
  {
    id: '',
    topic: "Missing America's Health Rankings data",
    definitions: [
      {
        key: 'Population data',
        description:
          'AHR does not have population data available for: preventable hospitalizations, voter participation, and non-medical drug use. We have chosen not to show any percent share metrics for the measures without population data because the source only provides the metrics as rates. Without population data, it is difficult to accurately calculate Percent share measures, which could potentially result in misleading data.',
      },
    ],
  },
]

function SdohLink() {
  return (
    <section id='#sdoh'>
      <article>
        <Helmet>
          <title>Social Determinants of Health - Health Equity Tracker</title>
        </Helmet>
        <h2 className='sr-only'>Social Determinants of Health</h2>

        <StripedTable
          id='#categories-table'
          applyThickBorder={false}
          columns={[
            { header: 'Category', accessor: 'category' },
            { header: 'Topics', accessor: 'topic' },
            { header: 'Variables', accessor: 'variable' },
          ]}
          rows={[
            {
              category: 'Social Determinants of Health',
              topic:
                'Care Avoidance Due to Cost, Poverty, Uninsured Individuals, Preventable Hospitalization',
              variable: 'Race/ethnicity, Sex, Age',
            },
          ]}
        />
        <h3 className='font-sansTitle text-title' id='#sdoh-data-sourcing'>
          Data Sourcing
        </h3>
        <p>
          Our tracker's data on social determinants of health, such as
          uninsurance rates and poverty levels, is largely sourced from{' '}
          <a href={'urlMap.amr'}>America’s Health Rankings (AHR)</a>. AHR itself
          gathers most of its data from the{' '}
          <a href={'urlMap.cdcBrfss'}>
            Behavioral Risk Factor Surveillance System (BRFSS)
          </a>{' '}
          survey run by the CDC, augmented by{' '}
          <a href={'urlMap.cdcWonder'}>CDC WONDER</a> and the{' '}
          <a href={'urlMap.censusVoting'}>U.S. Census</a>.
        </p>
        <Alert severity='info' role='note'>
          <AlertTitle>
            A note about the CDC's Behavioral Risk Factor Surveillance System
            (BRFSS) survey
          </AlertTitle>
          <p>
            It's important to note that because BRFSS is survey-based, it
            sometimes lacks sufficient data for smaller or marginalized racial
            groups, making some estimates less statistically robust.
          </p>
          <p>
            Additionally, BRFSS data by race and ethnicity is not available at
            the county level, limiting our tracker's granularity for these
            metrics.
          </p>
        </Alert>
        <p>
          We obtain our data for the following specific issues directly from
          America's Health Rankings (AHR). This data is based on{' '}
          {percentShareTooltip} metrics that AHR provides in downloadable data
          files. Click on the following to explore the report:
        </p>
        <ul className='list-none pl-0'>
          <li className='font-sansTitle font-medium'>
            <a
              className='no-underline'
              href='https://healthequitytracker.org/exploredata?mls=1.avoided_care-3.00&group1=All'
            >
              care avoidance due to cost
            </a>
          </li>
        </ul>

        <p>
          AHR usually gives us rates as percentages. In some cases, they provide
          the number of cases for every 100,000 people. We keep the data in the
          format AHR provides it. If we need to change a percentage into a{' '}
          {totalCasesPer100kPeopleTooltip} rate, we simply multiply the
          percentage by 1,000. For example, a 5% rate would become 5,000 per
          100,000 people.
        </p>
        <CodeBlock
          rowData={[
            {
              content: '5% rate (of 100)',
            },
            {
              content: '===',
            },
            {
              content: (
                <>
                  <b>5,000 per 100,000 people</b>
                </>
              ),
            },
          ]}
        />
        <Alert severity='info' role='note'>
          <AlertTitle>
            A note about the America's Health Rankings (AHR)'s population data
          </AlertTitle>
          <p>
            Without population data, it is difficult to accurately calculate{' '}
            {percentShareTooltip} measures, which could potentially result in
            misleading data.{' '}
          </p>
          <p>
            We don't display percent share figures for certain health measures
            because the original data source only gives us these numbers as{' '}
            {
              <DefinitionTooltip
                topic={'rates'}
                definitionItem={definitionsGlossary[40]}
              />
            }
            , and not as a portion of the population.
          </p>
          <p>
            Please note that AHR does not provide population-specific data for
            certain conditions, including:
            <ul>
              <li className='font-sansTitle font-medium'>
                <a href='https://healthequitytracker.org/exploredata?mls=1.preventable_hospitalizations-3.00&group1=All'>
                  preventable hospitalizations
                </a>
                .
              </li>
            </ul>
            However, we encourage you to explore our comprehensive reports for
            valuable insights into these and other conditions.
          </p>
        </Alert>
        <h3 className='font-sansTitle text-title' id='#sdoh-data-sources'>
          Data Sources
        </h3>
        <StripedTable
          applyThickBorder={false}
          columns={[
            { header: 'Source', accessor: 'source' },
            { header: 'Geographic Level', accessor: 'geo' },
            { header: 'Granularity', accessor: 'granularity' },
            { header: 'Update Frequency', accessor: 'updates' },
          ]}
          rows={sdohDataSources.map((source, index) => ({
            source: (
              <a
                key={index}
                href={`${DATA_CATALOG_PAGE_LINK}?${DATA_SOURCE_PRE_FILTERS}=${source.id}`}
              >
                {source.data_source_name}
              </a>
            ),
            geo: source.geographic_level,
            granularity: source.demographic_granularity,
            updates: source.update_frequency,
          }))}
        />

        <KeyTerms
          id='#sdoh-key-terms'
          definitionsArray={sdohDefinitionsArray}
        />
        <Resources id='#sdoh-resources' resourceGroups={[PDOH_RESOURCES]} />
      </article>
    </section>
  )
}

export default SdohLink