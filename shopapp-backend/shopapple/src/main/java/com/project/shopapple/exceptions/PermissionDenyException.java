package com.project.shopapple.exceptions;

public class PermissionDenyException  extends  Exception{
    public PermissionDenyException(String message){
        super(message);
    }
}
