import styles from "./styles.module.css";
import { useNavigate } from 'react-router-dom';
import Home from '../Home'
const Dashboard = () => {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate('/login');
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1 className={styles.appname}> MovieMate</h1>
				<div>
				<a href="/dashboard" className={styles.underline_on_click}>Home</a>
				<a href="/search" className={styles.underline_on_click}>Search</a>
				
				</div>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
				
			</nav>
			<Home/>
		</div>
	);
};
export default Dashboard;