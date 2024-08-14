package com.example.gemes.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MainController {

    /**
     * 初期画面表示処理
     * 
     * @return　ModaelAndView(top画面)
     */
    @GetMapping(value = "/")
    public ModelAndView top(){
        ModelAndView mav = new ModelAndView();
        mav.setViewName("top");
        return mav;
    }
    
    
}
