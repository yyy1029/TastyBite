package com.example.onlinefood.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
public class UploadController {

    @Value("${file.address}")
    String fileAdress;

    @Value("${file.staticPath}")
    String upload;

    @RequestMapping()
    @ResponseBody
    public String upload(MultipartFile file){

        try {
            //Define the prefix of the uploaded file
            String pre = "";
            pre = UUID.randomUUID()+"";

            //Get the suffix of the file
            String suffix = "";
            if(file != null){

                //.jpg
                String originalName = file.getOriginalFilename();
                suffix=  originalName.substring(originalName.lastIndexOf(".")+1);

            }
            //Document name
            String fileName = pre+"."+suffix;

            //Define the full path for file upload
            String filePath = fileAdress + "\\" + fileName ;

            //create file object
            File f = new File(filePath);

            //whether the directory exists or not, create it if it does not exist
            if(!f.isDirectory()){
                f.mkdirs();
            }

            //Uploading files
            file.transferTo(f);
            String url = "http://localhost:8080"+upload+fileName ;
            return url;

        } catch (IOException e) {
            e.printStackTrace();

        }
        return "upload failed";

    }

}
