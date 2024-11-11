import '../index.css'

const Home: React.FC = () => {

    const printToken = localStorage.getItem('token')
    const printUserName = localStorage.getItem('username')

    return (
        <div className="flex flex-col items-center justify-center h-full w-full bg-gray-50 dark:bg-gray-900">
            <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md">

                <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6"></p>
            </div>
        </div>
    );
};
export default Home;