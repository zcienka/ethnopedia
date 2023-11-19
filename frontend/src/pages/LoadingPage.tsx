import { ReactComponent as LoadingWheel } from "../assets/icons/loadingWheel.svg"

const LoadingPage = () => {
    return <div role="status" className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <LoadingWheel />
    </div>
}
export default LoadingPage