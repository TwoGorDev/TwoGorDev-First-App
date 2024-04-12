import { useEffect } from 'react'

export default function Account() {
	
  useEffect(() => {
    const fetchDataz = async () => {
		

      await fetch('http://localhost:4000/daily-summary/2024-04-13', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzksImlhdCI6MTcxMjk0ODYzMCwiZXhwIjoxNzE1NTQwNjMwfQ.BlPw6yihwR2C4mpNGfKq26DYkYuDAlMMeE5SqXAp1HM`,
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    };

    fetchDataz()
  }, [])
  

	return (
		<button className='btnbtn' onClick={() => fetchDataz()}>
			asdfasfasfg
		</button>
	);
}
