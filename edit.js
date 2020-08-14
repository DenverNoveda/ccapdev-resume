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
    
    document.onload = getData();

   
    function getData(){
        db.collection("others").doc("links").get().then(function(doc){
 
        console.log(doc.data());
        console.log("Document details successfully read!");
        
        loadLinks(doc);
    });
    db.collection("educations").get().then(function(snapshot){
        snapshot.forEach(function(doc){
            
            console.log(doc.data());
            console.log("Document details successfully read!");
           
            loadEduc(doc);
        })
    });

    db.collection("others").doc("intro").get()
        .then(function(doc){
            
            console.log(doc.data());
            console.log("Document details successfully read!");
            
            loadAboutMe(doc);
        });

        db.collection("works").get().then(function(snapshot){
        snapshot.forEach(function(doc){
            
            console.log(doc.data());
            console.log("Document details successfully read!");
            
            loadProject(doc);
           })

    });     
        db.collection("organizations").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                console.log(doc.data());
                console.log("Document details successfully read!");
                
                loadOrg(doc);
            })  
        });
    }

        function loadAboutMe(doc){
            var aboutMeInfo = document.getElementById("aboutMeInfo");

            var data = doc.data();
            var aboutMeText = data.value;
            var par1 = document.createElement("p");

            par1.setAttribute("contenteditable", "true");
            par1.setAttribute("id", "intro");
            par1.innerHTML = aboutMeText;

            aboutMeInfo.appendChild(par1);
   
        }
        function loadLinks(doc){
            var links = document.getElementById("links")

            var data = doc.data();
            var github = data.github;
            var twitter = data.twitter;
            var linkedin = data.linkedin;
            
            var par1 = document.createElement("p");
            var par2 = document.createElement("p");
            var par3 = document.createElement("p");
            
            var lGit = document.getElementById("lGithub");
            var lTwitter = document.getElementById("lTwitter");
            var lLinkedin = document.getElementById("lLinkedin");

            par1.setAttribute("contenteditable", "true");
            par2.setAttribute("contenteditable", "true");
            par3.setAttribute("contenteditable", "true");
          
            par1.setAttribute("id", "github");
            par2.setAttribute("id", "twitter");
            par3.setAttribute("id", "linkedin");
    
            par1.innerHTML = github;
            par2.innerHTML = twitter;
            par3.innerHTML = linkedin; 

            lGit.appendChild(par1);
            lTwitter.appendChild(par2);
            lLinkedin.appendChild(par3);
        }
        function loadEduc(doc){

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
             var delButton = document.createElement("button");

          par1.innerHTML = text1;
          par2.innerHTML = text2;
          par3.innerHTML = text3;
          delButton.innerHTML = "Delete";
          
            delButton.classList.add("del");
            delButton.setAttribute("onclick", "deleteSchool('"+ doc.id +"')");
            delButton.setAttribute("id", doc.id);
            sIcon.setAttribute("src", "school.png");
          
        
          container.appendChild(sIcon);
          container.appendChild(par1);
          container.appendChild(par2);
          container.appendChild(par3);
          container.appendChild(delButton);
          parent1.appendChild(container);
        
        }
        function loadProject(doc){
            
            var parent1 = document.getElementById("projectContainer");
           
            var data = doc.data(); 
            var description = data.description;
            var name = data.name;
            
    
         
          var par1 = document.createElement("div");
          var par2 = document.createElement("p");
         var delButton = document.createElement("button");
          
          par1.innerHTML = name;
          par2.innerHTML = description;
          delButton.innerHTML = "Delete";
         
            delButton.classList.add("del");
            delButton.setAttribute("onclick", "deleteWork('"+ doc.id +"')");
            delButton.setAttribute("id", doc.id);
          par1.appendChild(par2);
          par1.appendChild(delButton);
          parent1.appendChild(par1);   
          
        }
        function loadOrg(doc){

            var parent1 = document.getElementById("org");
           
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
            var delButton = document.createElement("button");

            par1.innerHTML = name;
            par2.innerHTML = position;
            par3.innerHTML = yearStart;
            delButton.innerHTML = "Delete"

            delButton.classList.add("del");
            delButton.setAttribute("onclick", "deleteOrg('"+ doc.id +"')");
            delButton.setAttribute("id", doc.id);

            container.appendChild(oIcon);
            container.appendChild(par1);
            container.appendChild(par2);
            container.appendChild(par3);
            container.appendChild(delButton);
            parent1.appendChild(container);
        }
        function loginEmail(){
            var email = document.getElementById("lEmail").value;
            var password = document.getElementById("lPassword").value;

            firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
                console.log("user signed in");

                document.getElementById("loginForm").style.display = "none";
                document.getElementById("header").style.display = "block";
                document.getElementById("aboutMe").style.display = "block";
                document.getElementById("education").style.display = "block";
                document.getElementById("organizations").style.display = "block";
                document.getElementById("works").style.display = "block";
                document.getElementById("contactInfo").style.display = "block";

            }).catch(function(err){
                if(err.code == "auth/wrong-password"){
                    alert("Wrong Password");
                }   
                else if(err.code == "auth/user-not-found"){
                    alert("User not found");
                }
                else if(err.code == "auth/invalid-email"){
                    alert("Invalid Email");
                }
            })
        
        }
        function editAboutMe(){
            var lgithub = document.getElementById("github").innerHTML;
            var ltwitter = document.getElementById("twitter").innerHTML;
            var llinkedin = document.getElementById("linkedin").innerHTML;
            var lintro = document.getElementById("intro").innerHTML;

            db.collection("others").doc("intro").update({
                value : lintro
            })
            db.collection("others").doc("links").update({
                github : lgithub,
                twitter : ltwitter,
                linkedin : llinkedin
            })       
            var message = document.getElementById("sMessage");
            
            message.innerHTML = "Changes Saved!";

            setTimeout(function(){
                message.innerHTML = "";
            },3000);
        }

        function addSchool(){
            var sName = document.getElementById("sName").value;
            var sDeg = document.getElementById("sDeg").value;
            var sYear = document.getElementById("sYear").value;

            
            var newObject = {
                school : sName,
                degree : sDeg,
                yearStart : sYear
            }
            db.collection("educations").add(newObject).then(function(doc){
                console.log("Item added with ID :  " + doc.id);
                var parent1 = document.getElementById("school");

              
                var text1 = newObject.school;
                var text2 = newObject.degree;
                var text3 = newObject.yearStart;
        
             
                var container = document.createElement("div");
                var par1 = document.createElement("div");
                var par2 = document.createElement("div");
                var par3 = document.createElement("div");
                var sIcon = document.createElement("img");
                 var delButton = document.createElement("button");
    
              par1.innerHTML = text1;
              par2.innerHTML = text2;
              par3.innerHTML = text3;
              delButton.innerHTML = "Delete";
              
                delButton.classList.add("del");
                delButton.setAttribute("onclick", "deleteSchool('"+ doc.id +"')");
                delButton.setAttribute("id", doc.id);
                sIcon.setAttribute("src", "school.png");
              
            
              container.appendChild(sIcon);
              container.appendChild(par1);
              container.appendChild(par2);
              container.appendChild(par3);
              container.appendChild(delButton);
              parent1.appendChild(container);
            
            }) 

            var message = document.getElementById("eMessage");
            
            message.innerHTML = "Added to Database";

            setTimeout(function(){
                message.innerHTML = "";
            },3000);
        }
        
        function addOrg(){
            var oName = document.getElementById("oName").value;
            var oPosition = document.getElementById("oPosition").value;
            var oYear = document.getElementById("oYear").value;

            var newObject = {
                name : oName,
                position : oPosition,
                yearStart : oYear
            }

            db.collection("organizations").add(newObject).then(function(doc){
                console.log("Item added with ID : " + doc.id);
                var parent1 = document.getElementById("org");
           
       
            var name = newObject.name;
            var position = newObject.position;
            var yearStart = newObject.yearStart;

            var container = document.createElement("div");
            var par1 = document.createElement("p");
            var par2 = document.createElement("p");
            var par3 = document.createElement("p");
            var oIcon = document.createElement("img");

            oIcon.setAttribute("src", "team.png");
            var delButton = document.createElement("button");

            par1.innerHTML = name;
            par2.innerHTML = position;
            par3.innerHTML = yearStart;
            delButton.innerHTML = "Delete"

            delButton.classList.add("del");
            delButton.setAttribute("onclick", "deleteOrg('"+ doc.id +"')");
            delButton.setAttribute("id", doc.id);

            container.appendChild(oIcon);
            container.appendChild(par1);
            container.appendChild(par2);
            container.appendChild(par3);
            container.appendChild(delButton);
            parent1.appendChild(container);
            })
            var message = document.getElementById("oMessage");
            
            message.innerHTML = "Added to Database";

            setTimeout(function(){
                message.innerHTML = "";
            },3000);
        }

        function addProject(){
            var pName = document.getElementById("pName").value;
            var pDesc = document.getElementById("pDesc").value;
          
            var newObject = {
                name : pName,
                description : pDesc
            }
            db.collection("works").add(newObject).then(function(doc){
                console.log("Item added with ID : " + doc.id);
                var parent1 = document.getElementById("projectContainer");
           
         
            var description = newObject.description;
            var name = newObject.name;
            
    
         
          var par1 = document.createElement("div");
          var par2 = document.createElement("p");
         var delButton = document.createElement("button");
          
          par1.innerHTML = name;
          par2.innerHTML = description;
          delButton.innerHTML = "Delete";
         
            delButton.classList.add("del");
            delButton.setAttribute("onclick", "deleteWork('"+ doc.id +"')");
            delButton.setAttribute("id", doc.id);
          par1.appendChild(par2);
          par1.appendChild(delButton);
          parent1.appendChild(par1);   
            })
            var message = document.getElementById("wMessage");
            
            message.innerHTML = "Added to Database";

            setTimeout(function(){
                message.innerHTML = "";
            },3000);

        }
        function deleteSchool(schoolId){
            db.collection("educations").doc(schoolId).delete();

            document.getElementById(schoolId).parentElement.remove();
        }
        function deleteWork(workId){
            db.collection("works").doc(workId).delete();
            
            document.getElementById(workId).parentElement.remove();
        }
        function deleteOrg(orgId){
            db.collection("organizations").doc(orgId).delete();

            document.getElementById(orgId).parentElement.remove();
        }
        function openFormE() {
            if(document.getElementById("educForm").style.display == "none")
                document.getElementById("educForm").style.display = "block";
            else
                document.getElementById("educForm").style.display = "none"; 
        }
          function openFormO() {
            if(document.getElementById("orgForm").style.display == "none")
                document.getElementById("orgForm").style.display = "block";
            else 
            document.getElementById("orgForm").style.display = "none";
        }
        
        function openFormW(){
            if(document.getElementById("projForm").style.display == "none")
               document.getElementById("projForm").style.display = "block";
            else
            document.getElementById("projForm").style.display = "none";   
        }
       
          