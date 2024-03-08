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

  return (
    <div className="stats-container">
      <h2 className="stats-h2">Statistics</h2>
      <ul className="click-list">
        <span className="click-wrapper">
          <span className="click-child">
            <div className="cont-wrap">
              <p>Total click</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="click-icon">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
                />
              </svg>
            </div>
          </span>
          <li>{totalClicks}</li>
        </span>
        <span className="click-wrapper">
          <span className="click-child">
            <div className="cont-wrap">
              <p>Avarage click</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="click-icon">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
                />
              </svg>
            </div>
          </span>

          <li>{avgClicksDec}</li>
        </span>
      </ul>
      <h3 className="mostVisited-h3">most visited Link</h3>
      <span className="most-visited-child">
        <p className="visited-link">{newUrl}</p>
        <p>
          {visitationCount} {visitationCount <= 1 ? 'click' : 'clicks'}
        </p>
      </span>
      <h3 className="mostVisited-h3 leastVisited-h3">Least visited Link</h3>
      <span className="most-visited-child">
        <p className="visited-link">{leastVisited.newUrl}</p>
        <p>
          {leastVisited.visitationCount}{' '}
          {leastVisited.visitationCount <= 1 ? 'click' : 'clicks'}{' '}
        </p>
      </span>
    </div>
  );
}
export default Stats;
