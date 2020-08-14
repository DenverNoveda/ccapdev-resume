var firebaseConfig = {
    apiKey: "AIzaSyCFeJ7KuccCwG8ER0GtYKKbOUdzZ_4N6AE",
    authDomain: "ccapdev-resume-8b3d0.firebaseapp.com",
    databaseURL: "https://ccapdev-resume-8b3d0.firebaseio.com",
    projectId: "ccapdev-resume-8b3d0",
    storageBucket: "ccapdev-resume-8b3d0.appspot.com",
    messagingSenderId: "50746413182",
    appId: "1:50746413182:web:f2d0044015b84a81eb882f"
    };
    // Initialize Firebase
    var defaultProject =  firebase.initializeApp(firebaseConfig);

    var db = firebase.firestore();
    
    db.collection("others").doc("links").get().then(function(doc){
 
        console.log(doc.data());
        console.log("Document details successfully read!");
        
        var lGit = document.getElementById("github");
        var lFacebook = document.getElementById("facebook");
        var lLinkedin = document.getElementById("linkedin");

        var data = doc.data();
        var github = data.github;
        var facebook = data.facebook;
        var linkedin = data.linkedin;
        
    
        lGit.setAttribute("href", github);
        lFacebook.setAttribute("href", facebook);
        lLinkedin.setAttribute("href", linkedin);
       
    });
    db.collection("educations").get().then(function(snapshot){
        snapshot.forEach(function(doc){
            
            console.log(doc.data());
            console.log("Document details successfully read!");
            
            var parent1 = document.getElementById("school");

            var data = doc.data(); 
            var text1 = data.school;
            var text2 = data.degree;
            var text3 = data.yearStart;
    
          var container = document.createElement("div");
          var par1 = document.createElement("div");
          var par2 = document.createElement("div");
          var par3 = document.createElement("div");
          var sIcon = document.createElement("img");
          
          sIcon.setAttribute("src", "school.png");

          par1.innerHTML = text1;
          par2.innerHTML = text2;
          par3.innerHTML = text3;
        

          
         container.appendChild(sIcon);
         container.appendChild(par1);
         container.appendChild(par2);
         container.appendChild(par3);
         parent1.appendChild(container);
        
        })
    });

    db.collection("others").doc("intro").get()
        .then(function(doc){
            
            console.log(doc.data());
            console.log("Document details successfully read!");
            
            var aboutMeInfo = document.getElementById("aboutMeInfo");

            var data = doc.data();
            var aboutMeText = data.value;
            var par1 = document.createElement("p");

            par1.innerHTML = aboutMeText;
            aboutMeInfo.appendChild(par1);
   
        });

        db.collection("works").get().then(function(snapshot){
        snapshot.forEach(function(doc){
            
            console.log(doc.data());
            console.log("Document details successfully read!");
            
            var parent1 = document.getElementById("projectContainer");
           
            var data = doc.data(); 
            var description = data.description;
            var name = data.name;
            
    
         
          var par1 = document.createElement("div");
          var par2 = document.createElement("p");
         
          par1.innerHTML = name;
          par2.innerHTML = description;
            
          par1.appendChild(par2);
          parent1.appendChild(par1);   
        
        })

    });     db.collection("organizations").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                
                var parent1 = document.getElementById("org");
                console.log(doc.data());
                console.log("Document details successfully read!");
                
                var data = doc.data();
                var name = data.name;
                var position = data.position;
                var yearStart = data.yearStart;

                var container = document.createElement("div");
                var par1 = document.createElement("p");
                var par2 = document.createElement("p");
                var par3 = document.createElement("p");
                var oIcon = document.createElement("img");

                oIcon.setAttribute("src", "team.png");
                par1.innerHTML = name;
                par2.innerHTML = position;
                par3.innerHTML = yearStart;

                
                par1.appendChild(par2);
                par1.appendChild(par3);
                
                container.appendChild(oIcon);
                container.appendChild(par1);
               
                parent1.appendChild(container);
            })
        });
