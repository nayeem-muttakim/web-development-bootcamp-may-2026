import { ArrowUpIcon } from "lucide-react";
import { Button } from "./button";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center max-w-7xl px-5 py-3 text-[#F5F7FA] bg-[#181C25]">
      <h1 className="">FileHarbor</h1>
      <Button size={"lg"} className="bg-[#4F8CFF] rounded">
        Upload <ArrowUpIcon />
      </Button>
    </div>
  );
};

export default Navbar;
