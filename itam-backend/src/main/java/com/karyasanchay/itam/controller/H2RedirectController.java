package com.karyasanchay.itam.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class H2RedirectController {
    
    // In Spring Boot 3, trailing slash matching is disabled by default.
    // If you go to /h2-console, it expects a static resource.
    // This redirects /h2-console to /h2-console/ where the Servlet is mapped!
    @GetMapping("/h2-console")
    public RedirectView handleMissingSlash() {
        return new RedirectView("/h2-console/");
    }
}
