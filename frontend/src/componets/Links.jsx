import {React,useState} from "react";
import Link from "./Link";
import {useAuth} from "../contex/auth";

const Links = () => {
  const {isAuth} = useAuth();
 return(
  <>
  {!isAuth&&(
    <>
    <Link path="/" title="American Insurance" />
    <Link path="/register" title="Register"/>
    <Link path="/login" title="Login" />
    </>
  )}
  {isAuth&&(
    <>
    <Link path="/" title="American Insurance" />
    <Link path="/claim" title="Claim" />
    <Link path="/profile" title="Profile" />
    </>
  )}
     </>
 )
};
export default Links;
