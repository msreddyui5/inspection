sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"oft/fin/ar/models/models",
	"oft/fin/ar/util/lifeSaver"
], function(Controller, oMyModels, lifeSaver) {
	"use strict";
	return Controller.extend("oft.fin.ar.controller.Main", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf oft.fin.ar.view.Main
		 */
		 //it like constructor of a class, just the way constructor is called when object of class
		 //is created this method will also be called once UI5 create object of controller
		formatter: lifeSaver,
		onInit: function() {
		// //Step 1: Create a brand new model object - JSON Model
		// 	var oModel = new sap.ui.model.json.JSONModel();
		// //Step 2: Set the data to model
		// 	//oModel.setData();
		// 	oModel.loadData("models/mockData/sample.json");
		// //Step 3: Make the model available to app - All the views (app), Single view, Control
		// 	sap.ui.getCore().setModel(oModel);
		// 	oModel.setDefaultBindingMode("OneWay");
			var oModel = oMyModels.createJSONModel("models/mockData/sample.json");
			var oModelXML = oMyModels.createXMLModel("models/mockData/myData.xml");
			//--a model which is set w/o name is called - default model
			this.oCore.setModel(oModel);
			//setting global variable at controller level
			this.oView = this.getView();
			
			var oModel1 = oMyModels.createJSONModel("models/mockData/secondFile.json");
			//named model - another model at all level with different name
			this.oCore.setModel(oModel1,"mario");

			var oI18nModel = oMyModels.createResourceModel();
			this.oCore.setModel(oI18nModel,"i18n");
			//var oSal = this.getView().byId("idSalary");
			//var oCurr = this.getView().byId("idCurr");
			//oSal.bindValue("/empStr/salary");
			//oCurr.bindProperty("value","/empStr/currency");
			this.getView().byId("idTable").addStyleClass("anubhav");
		},
		onAddCol: function(oEvent){
			
			var myText = window.prompt("Enter your dynamic name");
			
			//Step 1: Get the object of the table control
			var oTab = this.getView().byId("idTable");
			//Step 2: Create a brand new column object
			var oColDyn = new sap.ui.table.Column({
				label: new sap.m.Text({text: myText}),
				template: new sap.m.Text({  
					
				})
			/*	template: new sap.m.HBox({
					items: [
						new sap.m.Button({
							icon: "sap-icon://edit"
						}),
						new sap.m.Button({
							icon: "sap-icon://delete"
						}) 
					]
				})*/
			});
			//Step 3: Add the column to the table
			oTab.addColumn(oColDyn);
			
			//Step 1: Get the simple form object
			var oSimple = this.getView().byId("anubhavForm");
			//Step 2: Create a label and a input instance
			var oLabel = new sap.m.Label({text: myText});
			var oInput = new sap.m.Input();
			//Step 3: add content dynamically
			oSimple.addContent(oLabel);
			oSimple.addContent(oInput);
			
		},
		onBeforeRendering: function(){
			// if(table has more than 10 entries do not show form){
			// 	this.getView().byId("anubhavForm").setVisible(false);	
			// }
		},
		onAfterRendering: function(){
			$("#__button0").fadeOut(5000, function(){
				$("#__button0").fadeIn(5000);
			});
		},
		onMagic: function(){
			var oModel = this.oCore.getModel();
			var currentState = oModel.getProperty("/empStr/shivang");
			if(currentState === false){
				oModel.setProperty("/empStr/shivang", true);	
			}else{
				oModel.setProperty("/empStr/shivang", false);
			}
		},
		oCore: sap.ui.getCore(),
		sPath: "",
		
		onFlip: function(){
			alert(this.sPath);
			var oModel = this.oCore.getModel();
			var oMario = this.oCore.getModel("mario");
			this.oCore.setModel(oMario);
			this.oCore.setModel(oModel, "mario");
		},
		onSelect: function(oEvent){
			///oEvent.getSource -- will give us the object of source control --- we can avoid using id of control
			///getParameter("name of param") --- returns the result
			///address of the element which was selected
			var oContext = oEvent.getParameter("rowContext");
			this.sPath = oContext.getPath();
			console.log(this.getView().getModel().getProperty(this.sPath + "/empNo"));
			//this address can be bound to the simple form
			var oSimple = this.getView().byId("anubhavForm");
			//Element Binding
			oSimple.bindElement(this.sPath);
			//alert("this is row selection  " + sPath );
		},
		onAddRow: function(){
			//Step 1: get the model object
			var oModel = this.getView().getModel();
			//Step 2: get the data from input fields which are connected to empStr
			var empStr = oModel.getProperty("/empStr");
			//Step 3: get data from table
			var empTab = oModel.getProperty("/empTab");
			//Step 4: Add the new record to table
			empTab.push(empStr);
			//Step 5: set data back to the model in emp tabel
			oModel.setProperty("/empTab", empTab);
		},
		onRequest: function(){
			$.get("https://www.onlinefioritrainings.com/", function(data, status){
			    alert("Data: " + data + "\nStatus: " + status);
			  });
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf oft.fin.ar.view.Main
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf oft.fin.ar.view.Main
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf oft.fin.ar.view.Main
		 */
		//	onExit: function() {
		//
		//	}

	});

});