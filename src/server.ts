import app from "./app";

const port = 5000; 


const startServer =()=>{
      try{
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }

}

startServer();