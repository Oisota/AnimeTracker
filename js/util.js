(function(exports) {
    exports.Util = exports.Util || {};

    exports.Util.fieldsEmpty = function(fields) {
        for (var i=0; i<fields.length; i++) {
            var field = $(fields[i]).val().trim();
            if (field === '') {
                return true;
            }
        }
        return false;
    }
})(this.App = this.App || {});
