import { useSelector } from "react-redux";
import Card from "../../components/card";
import "./home.scss";
import Loader from "../../components/loader/index";
import Error from "../../components/error/index";

const Home = () => {
  const { jobs, isLoading, error } = useSelector((store) => store.jobReducer);

  /*
   * Problem:
   I want to create multiple arrays by grouping the data within an array based on their status values.

   * Solution:
   !By using the reduce array method, we grouped the job objects in the array according to their status values and created multiple arrays inside an object.
   */
  const grouped = jobs.reduce((grouped, job) => {
    // If there is no array for the corresponding status in the new object, create an empty array
    if (!grouped[job.status]) {
      grouped[job.status] = [];
    }

    // Push the job into the array corresponding to its status value
    grouped[job.status].push(job);

    // Return the final form of the object
    return grouped;
  }, {});

  return (
    <div className="home-page">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error info={error} />
      ) : (
        <div className="layout">
          {/* 
           * !Problem:
           We want to iterate through all the arrays inside the grouped object and display them on the screen.

           * Solution:
           We created an array from the object's keys using the Object.keys() method. After creating the array, we iterate over the arrays corresponding to each key in the object and display them on the screen.
          */}
          {Object.keys(grouped).map((status) => (
            <div key={status} className="group">
              <h1 className="title">
                {status} ({grouped[status].length})
              </h1>

              <div className="list">
                {grouped[status].map((job) => (
                  <Card key={job.id} job={job} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
