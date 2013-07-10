/**
    * @ngdoc service 
    * @name umbraco.resources.contentTypeResource
    * @description Loads in data for content types
    **/
function contentTypeResource($q, $http, $rootScope, angularHelper) {

    /** internal method to get the api url */
    function getChildContentTypesUrl(contentId) {
        return Umbraco.Sys.ServerVariables.contentTypeApiBaseUrl + "GetAllowedChildren?contentId=" + contentId;
    }

    return {

        //return a content type with a given ID
        getContentType: function (id) {

            var deferred = $q.defer();
            var data = {
                name: "News Article",
                alias: "newsArticle",
                id: id,
                tabs: []
            };
            
            deferred.resolve(data);
            return deferred.promise;
        },
        //return all available types
        all: function () {
            return [];
        },

        //return children inheriting a given type
        children: function (id) {
            return [];
        },

        //return all content types a type inherits from
        parents: function (id) {
            return [];
        },

        //return all types allowed under given document
        getAllowedTypes: function (contentId) {
           
            return angularHelper.resourcePromise(
                $http.get(getChildContentTypesUrl(contentId)),
                'Failed to retreive data for content id ' + contentId);
        }

    };
}
angular.module('umbraco.resources').factory('contentTypeResource', contentTypeResource);