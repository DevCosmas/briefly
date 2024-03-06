import { useEffect } from 'react';
function Stats({ data }) {
  let totalClicks = data
    .map((obj) => obj.visitationCount)
    .reduce((acc, count) => acc + count, 0);
  let avgClicks = totalClicks / data.length;
  let avgClicksDec = avgClicks.toFixed(2);
  let { visitationCount, newUrl } = data.reduce((prev, current) => {
    return prev.visitationCount > current.visitationCount ? prev : current;
  });
  let leastVisited = data.reduce((prev, current) => {
    return prev.visitationCount < current.visitationCount ? prev : current;
  });

  // console.log(mostClicked);

  return (
    <div className="stats-container">
      <h2 className="stats-h2">Statistics</h2>
      <ul>
        <li>Total click :{totalClicks}</li>
        <li>Avarage click :{avgClicksDec}</li>
      </ul>
      <h3>most visited Link</h3>
      <span>
        <p>{newUrl}</p>
        <p>{visitationCount}</p>
      </span>
      <h3>Least visited Link</h3>
      <span>
        <p>{leastVisited.newUrl}</p>
        <p>{leastVisited.visitationCount}</p>
      </span>
    </div>
  );
}
export default Stats;
