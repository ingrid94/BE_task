# BE_task    

This is my back end developer task.     

The task was made using Node.js, express and mongoDB. It was implemented on local server and local database.     

IN folder "Views" there are few webpage views to help mock sending POST and DELETE requests. There is also view for the first page.     

To start service you need to start server (cmd in folder: node test.js), ctrl + right click on the page it gives and you get to the front page. In command line should appear everything that is in database table 'organizations'.     

To use POST request with your own json change variable 'request' in post.html. After saving it run the server and add '/add' at the end of webpage. To see the result go to the front page.      

To use DELETE request run the server and add '/remove' at the end of webpage. To see the result go to front page again.    

It was difficult to implement data with recursion. I thought of adding parents' names and daughters' names with the organizations as different lists. I didn't manage to implement it since I'm not familiar with language and I have never used database recursively. Thus the POST and GET request are not complete.     
