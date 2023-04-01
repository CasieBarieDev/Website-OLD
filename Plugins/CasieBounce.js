if (document.readyState !== 'loading') {CasieBounce();
} else {document.addEventListener('DOMContentLoaded', function () {CasieBounce();});}
function CasieBounce() {
    const type =  document.getElementById("type"),
        rounded = document.getElementById("rounded"),
        region = document.getElementById("region"),
        region_name = document.getElementById("region-name"),
        world_name = document.getElementById("world-name"),
        format = document.getElementById("format"),
        position = document.getElementById("position"),
        result = document.getElementById("result"),
        preview = document.getElementById("preview");
    rounded.addEventListener("change", updatetext);
    region_name.addEventListener("input", updatetext);
    world_name.addEventListener("input", updatetext);
    position.addEventListener("input", updatetext);
    type.selectedIndex = 0;
    rounded.selectedIndex = 1;
    region.selectedIndex = 1;
    format.selectedIndex = -1;

    function typeChange() {
        if(type.value !== "Total") {format.disabled = false;
        } else {
            format.disabled = true;
            format.selectedIndex = -1;
        } if(type.value === "Leaderboard") {position.disabled = false;
        } else {
            position.disabled = true;
            position.value = '';
        } updatetext(); formatChange(); valid();
    } type.addEventListener("change", typeChange);
    typeChange()

    function regionChange() {
        if(region.value === "Yes") {
            region_name.disabled = false;
            world_name.disabled = false;
        } else {
            region_name.disabled = true;
            world_name.disabled = true;
            region_name.value = '';
            world_name.value = '';
        } updatetext(); valid();
    } region.addEventListener("change", regionChange);
    regionChange()

    function formatChange() {
        if(type.value === "Leaderboard" && format.value === "Name") {
            rounded.disabled = true;
            rounded.selectedIndex = -1;
        } else {
            rounded.disabled = false;
            rounded.selectedIndex = 1;
        }
        updatetext(); valid()
    } format.addEventListener("change", formatChange);
    formatChange();

    function valid() {
        const allForm = document.querySelectorAll('.form input, .form select');
        for (let form of allForm) {
            if(!form.disabled && form.value === '' || !form.checkValidity()) {form.classList.add("invalid");
            } else {form.classList.remove("invalid");}
        } updatetext();
    }
    region_name.addEventListener("input", valid);
    world_name.addEventListener("input", valid);
    position.addEventListener("input", valid);

    function updatetext() {
        let output = "%cb_";
        let previewtext = "";
        switch (type.value) {
            case "Total":
                output += "total";
                if(region.value === "Yes") {output += "region_" + region_name.value + ":" + world_name.value;}
                if(rounded.value === "Yes") {
                    output += "_NUMBER-ROUNDED%";
                    previewtext += "3.7k";
                } else {
                    output += "_NUMBER-FULL%";
                    previewtext += "3745";
                } break;
            case "Player":
                output += "player";
                if(region.value === "Yes") {output += "region_" + region_name.value + ":" + world_name.value;}
                output += "_" + format.value.toUpperCase();
                if(format.value !== "Name") {
                    if(format.value === "Both") {previewtext += "CasieBarie: ";}
                    if(rounded.value === "Yes") {
                        output += "-ROUNDED%";
                        previewtext += "3.7k";
                    } else {
                        output += "-FULL%";
                        previewtext += "3745";
                    }
                } else {
                    output += "%"
                    previewtext = "CasieBarie";
                } break;
            case "Leaderboard":
                output += "leaderboard";
                if(region.value === "Yes") {output += "region_" + region_name.value + ":" + world_name.value;}
                output += "_" + position.value + "_";
                output += format.value.toUpperCase();
                if(format.value !== "Name") {
                    if(format.value === "Both") {previewtext += "CasieBarie: ";}
                    if(rounded.value === "Yes") {
                        output += "-ROUNDED%";
                        previewtext += "3.7k";
                    } else {
                        output += "-FULL%";
                        previewtext += "3745";
                    }
                } else {
                    output += "%"
                    previewtext = "CasieBarie";
                } break;
        }
        let isValid = true;
        const allForm = document.querySelectorAll('.form input, .form select');
        for (let form of allForm) {if(form.classList.contains("invalid")) {isValid = false;}}
        if(isValid) {
            result.innerHTML = "<co-py>" + output + "</co-py>";
            result.classList.remove("invalid");
            preview.innerHTML = previewtext;
            preview.classList.remove("invalid");
        } else {
            result.innerHTML = "INVALID";
            result.classList.add("invalid")
            preview.innerHTML = "INVALID";
            preview.classList.add("invalid")
        }
    } copy();
}