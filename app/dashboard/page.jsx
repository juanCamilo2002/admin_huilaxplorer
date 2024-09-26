import ActiveUsersAreaChart from "../components/dashboard/charts/ActiveUsersArea"
import PopularityBarChart from "../components/dashboard/charts/PopularityBarChart"
import PreferencesPieChart from "../components/dashboard/charts/PreferencesPieChart"
import VisitsLineChart from "../components/dashboard/charts/VisitLineChart"


const DashboardPage = () => {
  return (
    <div>
      <div className="flex my-8 gap-3">
        <div className="w-1/3">
          <PopularityBarChart />
        </div>
        <div className="w-2/3">
          <VisitsLineChart />
        </div>
      </div>
      <div className="flex my-2 gap-3">
        <div className="w-2/3">
          <ActiveUsersAreaChart />
        </div>
        <div className="w-1/3">
          <PreferencesPieChart />

        </div>
      </div>
    </div>
  )
}

export default DashboardPage