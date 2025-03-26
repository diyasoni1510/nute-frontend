import React,{useEffect} from 'react'
import "./404page.css"
import { Link } from 'react-router-dom'
const NotFound = () => {
	useEffect(() => {
        // Add a class to the body when the component mounts
        document.body.classList.add("my-page-background");
    
        // Remove the class when the component unmounts
        return () => {
          document.body.classList.remove("my-page-background");
        };
      }, []);
  return (
   <>
   <section className="page_404">
	<div className="container">
		<div className="row">	
		
		<div className="bannerdv">
		<div className="four_zero_four_bg">
			
		
		</div>
		
		<div className="contant_box_404">
    <h1 className="text-center ">404</h1>
		<h3 className="h2">

		Look like you're lost
		</h3>
		
		<p>the page you are looking for not avaible!</p>
		
		<Link to="/" className="link_404">Go to Home</Link>
	</div>
		</div>
		
		</div>
	</div>
</section>
   </>
  )
}

export default NotFound