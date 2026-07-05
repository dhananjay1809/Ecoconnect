import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Welcome to EcoConnect</h1>
      <ul>
        <li><Link to="/cloth-Donation">Cloth Reuse</Link></li>
        <li><Link to="/food-donation">Food Donation</Link></li>
        <li><Link to="/garbage-cleaner">Garbage Cleaner</Link></li>
        <li><Link to="/animal-rescue">Animal Rescue</Link></li>
      </ul>
    </div>
  );
}
