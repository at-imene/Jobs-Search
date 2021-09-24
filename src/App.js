
import useFetchJobs from './useFetchJobs';
import { Container } from 'react-bootstrap'
import Job from './Compnents/Job.jsx'
import JobPagination from './Compnents/JobPagination';
import { useState } from 'react';
import SearchForm from './Compnents/SearchForm';
function App() {


  const [params, setParams] = useState({ description: '' })
  const [page, setPage] = useState(1)
  console.log('Callled paramss: ', params)
  console.log('Callled Page: ', page)
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page)


  const handleParamsChange = function (e) {
    const name = e.target.name
    const value = e.target.value
    setPage(1)
    setParams(p => ({ ...p, [name]: value }))
  }

  return (
    <Container className="my-4">
      <h1 className="my-4">
        Jobs Finder</h1>
      <SearchForm params={params} handleSearch={handleParamsChange} />
      <JobPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error</h1>}
      {jobs.map((job, idx) =>
        <Job key={idx + job.title} job={job} />
      )}

      <JobPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

export default App;
