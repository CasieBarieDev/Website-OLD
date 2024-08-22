
if (document.readyState !== 'loading') {CasieBounce();
} else {document.addEventListener('DOMContentLoaded', function () {CasieBounce();});}
function CasieBounce() {
    const
        plugin_version = document.getElementById("version"),
        type = document.getElementById("type"),
        rounded = document.getElementById("rounded"),
        format = document.getElementById("format"),
        name_format = document.getElementById("name-format"),
        region = document.getElementById("region"),
        region_name = document.getElementById("region-name"),
        world_name = document.getElementById("world-name"),
        position = document.getElementById("position"),
        result = document.getElementById("result"),
        preview = document.getElementById("preview")
    let isOldVersion
    plugin_version.selectedIndex = 1;
    type.selectedIndex = 0;
    rounded.selectedIndex = 1;
    region.selectedIndex = 1;
    format.selectedIndex = -1;
    name_format.selectedIndex = -1;

    function versionchange() {
        isOldVersion = (plugin_version.selectedIndex === 1);
        formatChange(); updateText(); valid();
    } plugin_version.addEventListener("change", versionchange);
    versionchange();

    function typechange() {
        if(type.value !== "Total") {format.disabled = false;
        } else {
            format.disabled = true;
            format.selectedIndex = -1;
        } if(type.value === "Leaderboard") {
            position.disabled = false;
            document.querySelectorAll("#format option").forEach(opt => {if(opt.value === "Name") {opt.hidden = false;}});
        } else {
            position.disabled = true;
            position.value = '';
            document.querySelectorAll("#format option").forEach(opt => {if(opt.value === "Name") {opt.hidden = true;}});
        } updateText(); formatChange(); valid();
    } type.addEventListener("change", typechange);
    typechange();

    function formatChange() {
        if(type.value !== "Number" && format.value === "Name") {
            rounded.disabled = true;
            rounded.selectedIndex = -1;
        } else {
            rounded.disabled = false;
            rounded.selectedIndex = 1;
        } if(type.value !== "Total" && !isOldVersion) {
            if(format.value === "Number") {
                name_format.disabled = true;
                name_format.selectedIndex = -1;
            } else {name_format.disabled = false;}
        } else {
            name_format.disabled = true;
            name_format.selectedIndex = -1;
        } updateText(); valid();
    } format.addEventListener("change", formatChange);
    formatChange();

    function regionChange() {
        if(region.value === "Yes") {
            region_name.disabled = false;
            world_name.disabled = false;
        } else {
            region_name.disabled = true;
            world_name.disabled = true;
            region_name.value = '';
            world_name.value = '';
        } updateText(); valid();
    } region.addEventListener("change", regionChange);
    regionChange();

    function valid() {
        const allForm = document.querySelectorAll('.form input, .form select');
        for (let form of allForm) {
            if(!form.disabled && form.value === '' || !form.checkValidity()) {form.classList.add("invalid");
            } else {form.classList.remove("invalid");}
        } updateText();
    }

    function updateText() {
        let output = "%cb_";
        let previewtext = "";
        output += type.value.toLowerCase();
        if(region.value === "Yes") {output += "region_" + region_name.value + ":" + world_name.value + "_";} else {output += "_";}
        if(type.value === "Leaderboard") {output += position.value + "_";}
        output += format.value.toUpperCase();
        if(name_format.value !== "") {output += "-" + name_format.value.toUpperCase();}
        if(format.value !== "Number" && type.value !== "Total") {
            if(name_format.value === "Displayname") {previewtext += "[OWNER] ";
            } previewtext += "CasieBarie";
            if(format.value === "Both") {previewtext += ":";}
        }
        if(type.value !== "Total") {output += "-";}
        if(rounded.value === "Yes") {
            output += "ROUNDED%";
            previewtext += " 3.7k"
        } else {
            output += "FULL%";
            previewtext += " 3745"
        }
        let isValid = true;
        const allForm = document.querySelectorAll('.form input, .form select');
        for (let form of allForm) {if(form.classList.contains("invalid")) {isValid = false;}}
        if(isValid) {
            result.innerHTML = "<code class='copy'>" + output + "</code>";
            result.classList.remove("invalid");
            preview.innerHTML = previewtext;
            preview.classList.remove("invalid");
        } else {
            result.innerHTML = "INVALID";
            result.classList.add("invalid")
            preview.innerHTML = "INVALID";
            preview.classList.add("invalid")
        } copy();
    }
    region_name.addEventListener("input", valid);
    world_name.addEventListener("input", valid);
    position.addEventListener("input", valid);
    name_format.addEventListener("change", valid);
    rounded.addEventListener("change", valid);
}