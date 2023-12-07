try {
    let sWindow = $(".auto-click-select-window");
    if(sWindow.length) {
        sWindow.css("top", "0px");
        sWindow.css("left", "0px");
    }
    else {
        let selectedUi = null;
        let isSelectMode = false;
    
        function selectUi()
        {
            if(selectedUi) {
                selectWindow.removeClass("is-selected");
                selectedUi.removeClass("auto-click-selected");
                if(selectedUi.is(this)) {
                    selectedUi = null;
                    return false;
                }
            }
    
            selectedUi = $(this);
            selectedUi.addClass("auto-click-selected");
            selectWindow.addClass("is-selected");
            return false;
        }
    
        function createToggleBtn(onText, offText, onCallback, offCallback, isSelected=false)
        {
            let selectToggleButton = $("<button>");
            selectToggleButton.attr("type", "button");
            selectToggleButton.addClass("select-toggle-button");
            selectToggleButton.text(isSelected ? onText : offText);
            selectToggleButton.data("off-text", offText);
            selectToggleButton.data("on-text", onText);
            selectToggleButton.data("isSelected", isSelected);
    
            selectToggleButton.on("click", function() {
                var btn = $(this);
                var isSelected = !btn.data("isSelected");
    
                if(isSelected) {
                    if(onCallback() === false) {
                        return false;
                    }
                    btn.addClass("active");
                }
                else {
                    if(offCallback() === false) {
                        return false;
                    }
                    btn.removeClass("active");
                }
    
                btn.data("isSelected", isSelected);
    
                btn.text(      isSelected ? btn.data("on-text") : btn.data("off-text"));
    
                return false;
            });
            return selectToggleButton;
        }

        function removeWindow() {
            $(".auto-click-select-window").remove();
            $(".auto-click-selected").removeClass("auto-click-selected");
        }
    
    
        let selectWindow = $("<div>");
        selectWindow.addClass("auto-click-select-window");
        selectWindow.draggable();
    
        let selectToggleButton = createToggleBtn("선택종료", "선택하기",
            function() {
                isSelectMode = true;
                $("*:not(.auto-click-select-window):not(.auto-click-select-window *)").off("click");
                $("*:not(.auto-click-select-window):not(.auto-click-select-window *)").on("click", selectUi);
            },
            function() {
                isSelectMode = false;
                $("*:not(.auto-click-select-window):not(.auto-click-select-window *)").on("click");
                $("*").off("click", selectUi);
            }
        );
        selectToggleButton.addClass("atc-font-size");
        selectWindow.append(selectToggleButton);
    
        let timmerSetting = $("<input>");
        timmerSetting.attr("type", "datetime-local");
        timmerSetting.addClass("atc-font-size")
        
        selectWindow.append(timmerSetting);
    
        let autoClickButton = createToggleBtn("클릭 중지", "클릭 시작",
            function() {
                if(isSelectMode) {
                    alert("선택모드를 종료해주십시오");
                    return false;
                }
                if(selectedUi) {
                    selectedUi[0].click();
                }
                else {
                    alert("선택된 UI가 없습니다");
                    return false;
                }
                return true;
            },
            function() {

            }
        );
        autoClickButton.addClass("atc-font-size");
        selectWindow.append(autoClickButton);
    
        $("body").prepend(selectWindow);
    }
} catch(err) {
    console.error(err);
}