sap.ui.define(
	["sap/ui/model/json/JSONModel",
	 "sap/ui/model/xml/XMLModel",
	 "sap/ui/model/resource/ResourceModel"],
	function(JSONModel, XMLModel, ResourceModel){
		return {
			
			createJSONModel: function(sPath){
				var oModel = new JSONModel();
				oModel.loadData(sPath);
				return oModel;
			},
			createXMLModel: function(sPath){
				var oModel = new XMLModel();
				oModel.loadData(sPath);
				return oModel;
			},
			createResourceModel: function(){
				var oModel = new ResourceModel({
					bundleUrl: "i18n/i18n.properties"
				});
				return oModel;
			}
			
		};
	}
);