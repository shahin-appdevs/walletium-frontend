import { Button } from "antd";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div>
          <h2>Welcome to Walletium</h2>
          <Link href={"/dashboard"} className="text-">
            <Button type="primary">Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
