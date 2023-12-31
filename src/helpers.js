import $ from "jquery";
export function showLoader() {
  if ($("#loader").length) {
    $("#loader").addClass("show");
  }
}
export function hideLoder() {
  if ($("#loader").length) {
    $("#loader").removeClass("show");
  }
}
