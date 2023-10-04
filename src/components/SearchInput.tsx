"use client"

import { useRouter } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams()

    if(e.target.value){
      params.append("q", e.target.value)
    } else {
      params.delete("q")
    }
    
    router.push(`?${params}`);
  };
  return (
    <input
      onChange={handleChange}
      type="number"
      placeholder="Search Chapter..."
    />
  );
}
