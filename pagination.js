//Getting raw data from server

let request = new XMLHttpRequest();
let userDataRaw;
let table;
let flag = 0;
let previousBtnNumber = 1;
let nextBtnNumber = 2;

request.open('GET',"https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json", true);

request.send();

request.onload = () => {
    

    userDataRaw = JSON.parse(request.response);
    

    

    function clearTableContents()
    {
        let parent = table;
        while (parent.firstChild)
        {
            
            parent.removeChild(parent.firstChild);
        }

    }
    displayData= (n)=>
    {
        flag++;
        if(flag> 1)
        clearTableContents();
        
        if (flag === 1)
        {
            table = document.createElement("table");
            table.setAttribute("class", "table mt-5");
        }
        
        
        let thead = document.createElement("thead");
        
        let tr = document.createElement("tr");
        thead.append(tr);

        let th1 = document.createElement("th");
        th1.setAttribute("scope", "col");
        th1.innerText = "ID";
        th1.setAttribute("style", "text-align:center");
        tr.append(th1);
        
        let th2 = document.createElement("th");
        th2.setAttribute("scope", "col");
        th2.innerText = "Name";
        th2.setAttribute("style", "text-align:center");
        tr.append(th2);

        let th3 = document.createElement("th");
        th3.setAttribute("scope", "col");
        th3.innerText = "Email";
        th3.setAttribute("style", "text-align:center");
        tr.append(th3); 


        table.append(thead);
        document.body.append(table);


        //Print 10 records
        
        for (let i = (n - 1) * 10; i < (n - 1) * 10 + 10; i++)
    {
        
            let tablebody = document.createElement("tbody");
            table.append(tablebody);
            let newRow = document.createElement("tr");
        
        tablebody.append(newRow);
    
        let id = document.createElement("th");
            id.setAttribute("scope", "row");
            
            
            id.innerText = userDataRaw[i].id;
            id.setAttribute("style", "text-align:center");

        let name = document.createElement("td");
            name.innerText = userDataRaw[i].name;
            name.setAttribute("style", "text-align:center");

        let email = document.createElement("td");
            email.innerText = userDataRaw[i].email;
            email.setAttribute("style", "text-align:center");

        newRow.append(id, name, email);
        
    }

        //Altering the Previous Button Number

        previousBtnNumber = n - 1;
        if (previousBtnNumber === 0)
            previousBtnNumber = 1;
        
            let newPrevBtn = document.createElement("button");
            newPrevBtn.innerText = "Prev";
        newPrevBtn.setAttribute("onClick", `displayData(${previousBtnNumber})`);
        newPrevBtn.setAttribute("class", "btn btn-danger");
        newPrevBtn.setAttribute("style", "margin:0.3%");
           
            console.log(buttonPanel.childNodes);
            buttonPanel.replaceChild(newPrevBtn, buttonPanel.childNodes[1]);
    
        //Altering the Next Button Number
        console.log(nextBtnNumber, numberOfButtons,n);
        nextBtnNumber = n + 1;
        console.log(nextBtnNumber, numberOfButtons);
        if (nextBtnNumber === numberOfButtons + 1)
            nextBtnNumber = numberOfButtons ;
        
        
            let newNextBtn = document.createElement("button");
            newNextBtn.innerText = "Next";
        newNextBtn.setAttribute("onClick", `displayData(${nextBtnNumber})`);
        newNextBtn.setAttribute("class", "btn btn-danger");
             newNextBtn.setAttribute("style", "margin:0.3%");
            console.log(buttonPanel.childNodes);
        buttonPanel.replaceChild(newNextBtn, buttonPanel.childNodes[7]);
        
        //Shifting the buttons in the buttonPanel on clicking next/previous
      
        
        let firstBtnNumber;
        let btnsPerRow;
        
        for (let k = 5; k <= numberOfButtons; k += 5)
        {
            if (n <= k) {
                firstBtnNumber = k - 4;
                btnsPerRow = 5;
                break;
            }
            else
            {
                if ((k + 5) > numberOfButtons)
                    firstBtnNumber = k + 1;
                btnsPerRow = numberOfButtons - k;
            }
            
                

        }
        

        let btnPanelIndex, newBtnNumber;
        for ( btnPanelIndex = 2,newBtnNumber= firstBtnNumber; btnPanelIndex<=(1+btnsPerRow); btnPanelIndex++,newBtnNumber++)
        {
            let newBtn = document.createElement("button");
            newBtn.innerText = newBtnNumber;
            newBtn.setAttribute("type", "button");
            if (newBtnNumber === n)
            {
                newBtn.setAttribute("class", "btn btn-warning");
             newBtn.setAttribute("style", "margin:0.3%");
            }
                
            else
            {
             
             newBtn.setAttribute("class", "btn btn-primary");
             newBtn.setAttribute("style", "margin:0.3%");
            } 
            
            newBtn.setAttribute("onClick", `displayData(${newBtnNumber})`);
            buttonPanel.replaceChild(newBtn, buttonPanel.childNodes[btnPanelIndex]);
    
        }

        
         
    }
    
    let numberOfButtons = Math.ceil((userDataRaw.length) / 10);
    console.log(numberOfButtons);

    let buttonPanel = document.createElement("div");

    
    //first button
    let firstBtn = document.createElement("button");
    firstBtn.innerText = "First";
    firstBtn.setAttribute("onClick", `displayData(${1})`);
    firstBtn.setAttribute("class", "btn btn-danger");
    firstBtn.setAttribute("style", "margin:0.3%");
    buttonPanel.append(firstBtn);

    //Prev Button
    console.log("new:",previousBtnNumber);
    let prevBtn = document.createElement("button");
    prevBtn.innerText = "Prev";
    prevBtn.setAttribute("onClick", `displayData(${previousBtnNumber})`);
    prevBtn.setAttribute("class", "btn btn-success");
    prevBtn.setAttribute("style", "margin:0.3%");
    buttonPanel.append(prevBtn);


    //Buttons list
   for (let j = 1; j <= 5; j++)
    {
        
        let paginationBtn = document.createElement("button");

        buttonPanel.append(paginationBtn);
       paginationBtn.innerText = j;
       paginationBtn.setAttribute("onClick", `displayData(${j})`);
       
        
       
       
  
    }

    //Next button
    let nextBtn = document.createElement("button");
    nextBtn.innerText = "Next";
    buttonPanel.append(nextBtn);
    nextBtn.setAttribute("onClick", `displayData(${nextBtnNumber})`);

    //Last button
    
    let lastBtn = document.createElement("button");
    lastBtn.innerText = "Last";
    lastBtn.setAttribute("class", "btn btn-danger");
    lastBtn.setAttribute("style", "margin:0.3%");
    buttonPanel.append(lastBtn);
    lastBtn.setAttribute("onClick", `displayData(${numberOfButtons})`);

    document.body.append(buttonPanel);
    buttonPanel.setAttribute("style", "text-align:center");

    


    displayData(1);

    
    



    

}
