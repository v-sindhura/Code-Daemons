var express = require("express");
var bodyParser = require("body-parser");
var codeapp = express();
var path = require("path");
codeapp.use(bodyParser.urlencoded({ extended: true }));
codeapp.use(bodyParser.json());
codeapp.use(express.static(__dirname+''))
codeapp.set('view engine','ejs');

var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost:27017/codeApp",{useNewURLParser:true});

var companyschema = new mongoose.Schema({
    cid:Number,
    compname:String,
    des:String,
    url:String,
});
const company= mongoose.model("company",companyschema);

var userschema = new mongoose.Schema({
    uid:Number,
    uname:String,
    email:String,
    pwd:String,
    total_score:Number,
});
const user= mongoose.model("user",userschema);

var questionschema = new mongoose.Schema({
    qid:Number,
    cid:Number,
    qname:String,
    ques:String,
    level:String,
    time_limit:Number,
    score:Number,
});
const question=mongoose.model("question",questionschema);

var dashboardschema=new mongoose.Schema({
    did:Number,
    uname:String,
    qid:Number,
    rightans:Number,
    wrongans:Number,
    points:Number,
});
const dashboard=mongoose.model("dashboard",dashboardschema);


var questeditschema =new mongoose.Schema({
    qeid:Number,
    qid:Number,
    qp1:String,
    qp2:String,
    b1:String,
    b2:String,
    b3:String,
    b4:String,
    b5:String,
});
const questedit=mongoose.model("questedit",questeditschema);


var solutionschema =new mongoose.Schema({
    qid:Number,
    qurl:String,
});
const solution=mongoose.model("solution",solutionschema);


var myobj2=[{qid:1,cid:1,qname:"Largest Sum Contiguous Subarray",ques:"Given an array arr of N integers. Find the contiguous sub-array with maximum sum",level:"Easy",time_limit:30,score:10}];


//var myobj = [
//  { cid:1, compname:"Amazon", des:"Product based company", url:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAR4AAACwCAMAAADudvHOAAAA3lBMVEUjLz7/////mQAgLTz/mwAdKjoaKDgOIDIADSb/nQBmbHTs7O4UJDWdoacqNkXn6OpIUV1UXGUAJ0CCiI5fZnEAFyyVmaAbLD8AFCodLT8SKj8LHjHy8/QFGy/b3d/U1ti2ub05Q1Bxd3+mbCPV19mGi5IpNUTKzM9zeYEACCS7vsKorLGNkpiQYSj2lQAAJUA+R1NNVV88OTqaZiXWhRPOgBqyciFMQDdWRTR9WC2/eCA2NzorMzsAABWusbaFXCvkixFTRDZoTy53VS7qjwN+VzBgSzHeiQ1GPTnSghrMvWILAAAMJElEQVR4nO2aeUPivBbGi6ELULYiS2nLIio7ogKD4nUZedX5/l/opltyuqAzCNyXuef3z4whTZOnJ2dJKwgIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiBHCRFFkexhWLKXYQ8JUS3FyE0LU10py2L4Rxf3D8ko12oW7CMZNdqixiogymVFbE+nbVmJ9hDjCfWSZMse35AiN4DzImpkXjtDLF+WHhummUgkzEy3UqhJ8Fcjl8u1KZY9Vys97DbOB5Vp2ZutbPVoS7M1apcj81eV60o3Y49rmo3HnmQFeqiFeAzQhxhyOjto0jtmz1QrsHZRdacl2JOV1dIjncUgbhbfhJQLg0SAZrrGb2I8eq2DsmCl836fR+cxE+XC9Ftal2pgXEkpNQLDmsMc6CGHbsqo8E7y5dDklz86T8ifddufSloSlBKfRS7wbL+NKD+GJ0ilUNmTUjJ+Y9+6AF0al6JArC5cfhHqYxSC4jg9enyBaj7ys3dvvw+p8VV7yinssUlpv3EoK3AFmcIu9RFz0VVQztlW5/L85yzQpSmTWjd4FZiZ1Ytd+wXbOl/KQ6zoc+uy/cnlyfZHgT6Z3O4cECGx6tBJ1iLy9ENdRv1sqKUh++PKZ4l4Tn0Fv5THasX8eO77FiBPbsMAO6C8yQPYWzoojxkWw2xHLup520uM/uTR8APYV/JY4dt5v/bD8lS64T7XuzIffpMI3VpInoQZ7pIJN7CLwrsO4Mu+UZ6WI49U3PBzSQ7NPLoFK3JkodthNNmYzTOpXwW+0GyTkDy/Qd51WeI1bxoWykoB7JOWZ/ryJgWLjn4q3/SNUvGMD2AK5IsHm2juaHeJBTZktk+tnsgG18d7zEF5GhFXlYe/m1PHro0hbyjTFlHhMe/c239EOmVcg43UcgxQ5b7rUZElVeHGNLSi8phdKHb+cjfJj1ryR+x6Lk9mLYmSGpEnW1YUMeCtWpf9vgTMu+jIU2MbJ+3ZucVkzRMWfHzUNn8oGcWdBzPrhuz0rzEFTWeAgDxDmlcbfF7eQ/o2Mrun7xGIzm4yisgztN2iaAADGip0IqTPH50bmJgNZjxHKhh8ddFHa4BHf+0MAMza8/ZgYs5zg/K0+sROsPm8duSbSS7batpZfz7nz1lm9/AcHJDHdSzc5BIZKewHXHmk9OPAKVKyfpoDLsqF5TFA3pJ13QZ/br4LFBS2+m45JI9rXzIfprijzJDQek+R28U2k5s7n4g8TTcsAb/rxWDCMw8vrZEMOq4wPWUh5BN5YIxqeJEP7i2vG0+DHOcM5PFmASzudKeFBXEOHAgRJVXub5bn0TUFwj3FSPauj50YcatvOix1rTyJDslDRLBZPadBLtktBmWvnzoK3ATI42+/9p7kscOIXNbb16e9CnezEXmynhg55njPpLA8xeCuF1XLyE2LZxdZnkGE5LFYlGM5jSBOWVPWtx6gx4Ua+NPXNMc03ak8RLXaZ9lmPlz/heUZReRJfyqPKKvF0qARHjcojwp8SNfPV8DaR748YO8MjUAX77CN5NhMdymPKvW6kYQ4Th4v0gN5Tj+Rh1jTSmxiHJBH5IMlTFZLqpH0IrB3bGcD5PHc/17kIVZ6Q1H6PXkkMRuneVgeA+TTaXYewgMXkIdH9vNaQB55f/IQOb7y+6480nSD6EF5ZHDs8ciPCcGkekweibXllUPJEzwLM/Pn3IV+Rx5pGjCdfOOc7yEgjwjS5Qbh7bwo4dYjGIeXB2Zk+WyxLXwW2H9fHiIB2+n2CjkpPrDDshSmcrGbS+VKHmhzgWiQyIqGRAj5JC38fXlAsM4XLZWGlti0ED6cCjyBBznOxf/Q94ADuZFXk+5CHpCBmN75fJw8Eng43cBrHonX6yzv2Ry59iUPyH/PDW96fIdvLw+ofvxEL0YeIvMdaE4DCwJ1y6MVbcsaB5EnlIg69+A7fHt5wFmh4t1KrkTkgaelvb6sglepoIjrsqKCe6+SehB5wJx9xwi80fbyWMwoG7484EzbkwdWoplsttIr6orlOxru2hu+asBdF8SDyANcT0GMKOaZ9Z/LA1yPf/ZMRB7Y3RKJqNFD2sygZ7lvasDM/KMtbpJ5e9ADyFPmm8C3nj5fRqO8rTzcpeU964GVlTuMDCpRSEtwXlafhrpTeViLc4h0COsZBG9JW7gH9W/yLevxTtCgF06cO1Ypbyg53BMxQtg9Gm7QsLhZO2eBB5CHn3AmMvabfGKBUOsf+G8TufjSh/ZrX7EWMBW7TiBkkzrudgJTu6jZ7wja7G93wx5AHhAMEudtWVbhO/SEl6ptE7mArVRkWW6H3tnQypyEX20C7FMkaIEVSVXP+J9F6UDygFMnSqMZsXfbjLeQx4BlrtmMFKdd40t5YO5EXRiYmfui5yBZs7H5ZaaDfdy1hTxiIfEpDflreYjajP0x7wX6Q8gDAgQjw32gc1K3Tc1Vi3lz32LLzU8Dm8vMN7tdeFbpHtGK7bjXs6b/EchhKvbIaU++rXgmZZ45kX2riv0ysrRhreAJ0NQlVkHlh72CqtRq5ZpiTHvZBpCHlmRRfcxrljgeQh4S/vapq0vk0ll+5vpb5z3Bc1TzokwMN2loGU7VKtife52WLf6dlagaSiGb4YtT2+H9dd5mpz+fypPekTwCnTRYSL5nfzXnrK3hz4SHIf+9hMCu8N5GgoM8P/uWcnB/DZwPBi3b22a9D5jUUbZdjqxCNGg7k0BUR9CAMiODH/SLrCYxfXn4vELvS76DLJQG+Uwmk28Mz1R3ZlJ70Lr0py5eZ13YyYt06rWU2MFy2mvpsQWT2nXl3Bm3O7ouux2tUpN/PafKrAQFH75Slwy+PiHyZamb8T4JLQnwSEiQet492U5i8+rt8vtUolqWkLtUawZbm2iBj0hF2YV/OCjJRqTFBZqDKNekXE6wwJfAai34daZA9Lqm6Q+r1YOgafVq3OTKQuE0fVrQy+EPf9XIPd1ZGHLoJt+HEPJ1p52Pq2v68mkxe15Tnt/n42U9rrf9llX6F344TrTY6e6KqvbSeT5JJZMnLsnUyTzGfv6tkJt550Hbm0Day/zEV8Yn9UPf1+12jr5Mpdbjan0/o9dvT5IAT56fR2Q+9TGd9/Odtg+ByCqVmjzP5veLzu1t5/7XJHl08gjaKzX/5PPrPgQiPz5WD1Uat+oUrb6a2/qkXo5nc1HqyzXVJ/n8tAcnreswqtWXjvUI/74A9Rn11SxlB5X1mAbhPd3CSXf0jwm9z3pPjm5v6PVFyom6J4ubq91PXte0u86Sjlu1rSc5PzZ5aPLz042/yeTsTtN26TpJ/eqmM6HpDg3n9X/oTVLjo5OHWv+Ds8GcvG2xvNrRJiPUHz/NUrbyyaUuaB1bntVxuR4X/WrsJybJ1KTzQm3om8uwtXmdJ11xkrbNXD3T/82O0HhstJVnQI5C68VbVavrW0pEaDR/ePK0sb3+UvM8c+rpSOWhBnQ34RWAXR2NP6o05vyhRFSaOnnrvKdSvjWedJzAVR9T+Sd7qosPQb3egSVSkhYc8/GLQHdJ9XdWRWyjqT68dX6BIpRup5cr52JtljxJ3R6r8dgQ7WaeDNSQVKKT2f14ubJFqlf1mNML2qRX7axYWL3d3r8nU3CE5PrOi4T6D7q31keWE4bRr5aRIjtJNUquf93f3i1pkUCoEjZ191+6kx5WH8vX2/vZOqiMfeXkVvfNpX6bOkndHbPxOFRjBHJFoiqlJuv32ZwWmYtFp9NZLO7n89n7ekJ/SCYj1yTXt4QdlhD9+SR1f/TqCM4Z1mISIxDXKRk9p4j2en7SQRVX/UlbHo6qGt2Irq3Gz3Em9JvQ1On+Z7DE1e5T649jOsr4FOph3u7Xm0zjK21m45twaaK/v3/8DVuLUdUeXv9YIUebHzShDI+m3wh/je14EKoQTfAm4YC0UZqT5/u7jxhtnMGOO6THQxWqf7wuZuvUZxrZQW3yfv/08rBBm78ZnUq0Wt4tfr1Pkm4IB6Sc8+TF+O1G375GO3rsekEjqx/L13GHZju/bGj+07m9e/tx82CXHf93VhPBrh6qfrLs585V/a/0KgiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCHIT/Al5/E0HQZWNEAAAAAElFTkSuQmCC"},
//  { cid:2, compname:"CISCO", des:"Networking company", url:"data:image/png;base64,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"},
//    { cid:3, compname:"EY", des:"Cyber Security profile", url:"data:image/png;base64,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"},
// { cid:4, compname:"Arista", des:"Networking Company", url:"data:image/jpeg;base64,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"},

//{ cid:5, compname:"Sabre", des:"Service Based Company", url:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAACXCAMAAAAvQTlLAAAAw1BMVEX////lAQDiAADoAAD8/////f////3fAADrAAD8//3///v5///8//vyjIz2mZj/+/frVVb/8fH5vr7/+fnpSEboFQ//8Oz84eT0w8PnHh/nODr5xMj/+fH7tav55d73vbDzoZvyfH/wgYL8l6L40dDvX2HwKTfumprwUlPlKS/uaWL0k4v/6urhKyH5pKvqbGn6s7XtM0D83dH5ycL3g3rocnDupKTuQUbpgnTvmo/ybHLqGSzmQUrnjI/81t38/+/pZ1UYw2JdAAAJR0lEQVR4nO1YaXPayBbtTbsALUhC2BAgUowCNowJ8gR7kvn/v+qd2xK8JGXimqrkU/pUFmy1us/dzr0NYwYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgZ/AHxbKWYpGx+VxWzf9994wQ6xnikNG6959m9ihs3BiNFpthfSxzfWW3bALAILFGPW7+FF25PZ5DUbn1XwxjlKjex+Dd7DO7+FFjmpPw4eI6f5P+dls8CyVPc59IIgVL+Hl69Ums/fLQbL5er9ZJ6/FRVlwYJRPCKkcZpavym/7GpRZ5IDQgguP9xVbwTGQmHMoh7ru5i9VSj/FX6IHatlA0ZcCiG5g79clKtY6dS5ystiHwXXcPng14fRslW8KYU+QmTkrO4wUW/VT4IDf1n3/UrOH94qk/+OgMU7OErTkQ6XPS0u5DH2ravRtD0WO263UpQTFv5qXqN44DrEqcsuh595OVl1PY4KwT+I89px/ut5sSTjkgynrMJJThcZSpsVu64WcORn0ROTtW2Fv1rA4qeOD/27/rxv1xeHib9SdY2Xjfyqzyv5gHner2PU1dCjFC6nOoSrKqTboex4SkeU9qUdKSpOTchGMXi2Z7F4fDFgzzxyIKNOqWwS5gCrbZ/6k4+1vkfPbTsM7ct2aMhoEtfreM+1Lkj8ybbMDh7XmZAyAzMx9XGeQmUwK672D+2+iun0EDUcWlbV9PGWImfqa1zkPvkRLSkc+SBoU2+C/qLH+brLaSNT/3ZexEQPrc+jva9gIKTTiRB3ltXomyc2NWbkc3z4dK/dAmV73hxsFdCObJ+dS/dDfLN0yMnRYYRBI1T5EG3jeFweP+2D7bvdS71Bo1J2kFZtBIuFcKfDx5GyvJ9Uy8olhdc6IUVzujvcYmhRlo2AeRbF5bDLtIhktEbwchhTREM2dM5K9/R3SYqMyGfDGEqmqqaLAOefJ5FecgtL7MOnzEHZk33SyVZzxX5SLLOuAiVYSQmO9+MdrNbBYyHsuSvxxKH9uBZd6a5SNrLDdHmRlIx3Hx30is8qCO1K8KxpOPTt41inboPZLl81OolpE4csjbZKXc+vQisEDMCxGdmDd5pZzAJKFcaGUvbFKjoFEY67SeGx4unSGQQtAZWyeYmWMTLqy0M7iEr82hGaLl8xbz6mUpJkGZ1HXnvJ7etlHNe6M5IJFHkJHrB/Vyg/DKzgAB9kFGHRrGo4wCWaJSLAqowcrAX5/qleDh72yaGqJknlBfZJSyCqJ3NJoAVP2PwjCHYmunQOlbwY/kyODyWcRCHSWeZKek+664JqK91x16FWLj48pvkUFjvknQUqMnH480v9z2LyZV4U8e3XbbVY1uNpeWJ2Wp4jLHsCVbrirgQvh09nRTLuGpiDFnyVVqiSZxBCZsEeMo58jaC+UIpNStqKbN/jxxdISTkdR3WLYlV96cZFgXAPXEocenuK1OgzT2q3Yb9xMaP0JXubylPBPhMu1UV5c52Xb6mkxo6S0rqzTlB1ib3yWNG27d3dw0PbbmFB2+73N0WR0g2AGFWT2edV9HzaMtXyfh6R4JWIbxLvPorEMr7nDtknxBIvqkMmHD1UJdd5QfLSfN9oVelat85i4eyo6ug9FI1PNx8oQBAw3Zq8YHSs102pxaWFgB7oGD3BTZn6dGllXAyKuKiqRJy77/h03B3XsjtD7K/rqkIkMR1U76OGYohINU/rCImcQIhooMDtCLQ8P4BrEbQqWY5XzErAv8vKNSXJXlCZoWh4xNhYnN2VzbTesNN59HBJxFFLOm8Qk1c9ZWPm9JnuUqiL9KZdbRbtPpkUNKqiBXk29ZJA+4zlN/t2cRxnlHBD6AcX3RH8xDzfH8pOmwRfstvzvOjIU6xwFbXitdMPKUKHs5Np+DB5jRf6jDrfgwBcatJUf0DcfI8ar+7Wtr+dLI71uMwcrUDY70Ae0O5ypDMkdVxR1msfzVh1KUeBc6kJFtOLBsNjpGHkLYdjnnwFofX1qJUkE5krmlzfny24MdBXNaVuEbV290ThiTb7dgoR0UZnc5aOiaBLxQaSbLvWoyU5Ysvu5DlqpU8NjQU3z31knafo/1ivj/PXePlk9bl0eB0HuGyhKVKpjaqb2Q1bNLzriRzxYFWjOzdlVE4/dM9cXrGRSjISAZ1eKRtcZvEdZQiugEnZH5NVPxTga7oKS06XFic3Ft0dApZX7eZYT5+dIauF7hzQ0gIbJLqkSHZXIwUFkiT4SLYJU/FOFxhFdsby3TmKoqWBG3aSFZ0DqwD3lUOyJ8ySbfhaH0LAHvhlRp9t58Vs9VKKfs6Xt2nUuQS/KRT1w/44OWPsH4g3zWigVj/OT7oA4CZnvWWXuYzzR+VTHFl+HiH5O6RH0sfZ+RB6rw0UGIgetfddSo31WOqBR7j6ciTvGPHqJ7/6kJx0S6EwZpMgXeo+r0dKXmadKNDKBVS1+y09mEOAkBu+t+rlS473yYKGA0mWLEgLXhkNQzY6utRnnK6GuW6PQv+4jFWwozjqru6U5dkJrphWYdHdAoilbjduJxJuhOFtJs5L6zzALG0rXz06tJQGNowsrh4Q6DHptaUj/S0Chkkpkloge2b6f8qbQRqSWHaqrB3aDwOQhjrGMMHP6wUR6g7if2Ggjo/ofd3TjR3iRuXTF1JDIusi8iQTDg2a8uOWBVY1y1Gy33+HgDsNdH7saGLn1qgH/XULUcXTWms4tRMuxudxy1lSrHrnNatneXaPiCpkTz51zumVQIo0L88aDTN9be5mMjTt7O8c4+rNU7aKrfD7W1dItwH1OMCcrsdbrZRg99esIPlCmOcRtVtinQ0X3dAChnfKXp07TbSddQHFL45buvDMdc/U6TXBZQ7lp8JRyNJE62A3Gbq8TlL6Dqn9+G89//HqGVj6qsTytp7elxmmuLKZRrgQ0DVrhEBCNBbRtGmmT5vcqlabQQcUZzLsMVHeocaSZrx6tLzA8lU82Cy6Zy0ptY0odfkzujmNm+Ye29V3RYrEQoP6Uu/epxg/fxAwxvRFDNQwaO73yc1WNyKfrtmKmjXEJC+KnNZ+O4p/8xF3RDXCEpo86CIWfP/M1t9kYArBcIIn8ZeqiPUOCj7E47SwqWZfUQsDgz8cv+k7eAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA4M/GP8DXFGUpFT0DEMAAAAASUVORK5CYII="},
//
//{ cid:6, compname:"SAP LAB", des:"System Application Products", url:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAAtCAMAAAAUT/wOAAAAolBMVEX///8AZrMArO4AquwAp+oApegAo+YAoOQAnuIAm+AAmd4AarcAa7cAidAAldoAi9IAg8sAdb8AecIAcr3w+Px/zO/A4/RAk8zf8fqg1O6AxumgzejQ5PKOu91fv+tvxewgpOFAsORgt+Mgk9KAwOSv1+5grtxAnNOQxeWAud4ggMNAkcowh8XA2u2O2veO0vGv3vRwueFQp9pPntJQms9gpNP/faZwAAACeElEQVRYhbXUaYOaMBAG4OndbpEjIodQi7CIsFqr2/3/f62BTEISDsGW94tkGB4nkV14v1h+AXxYKtSGjwultuHTMmls+LxImA1flsiF2fB1gXAbvv3/CBueMMlus7lsNrv907+mtRHfBW3l98+E93lY2uG6bQLXC9u+ARtMmr1ENwmTumwmfO2ZLFobxHtTj2zX+E5/BoDhG23dwekYYzbF991Htqwz0AvdTk1XbbAs/UzoeZpWHelbg6Zg9eCQWm00G1oi3G63F0/qD6W2vYwHnue52vf22SAqCWsw0zjGK1dqC2V8W1+n/HbG7WNnVyt83YKViMk+UrnNbUocbxYFrq74WNcWOITZSk2MLPtIO/jKVVY9NtiiGKSWLSVDGzeQ1zXsfGYdnrzqs8G+SYvo1uJHviG8l3VwV1r12iB6cNCoQBzf0IONx3PV8WfgHUM2xQutktczig2t7Cu7CBQ8u+W8Pxu0gRBy0ErugRYj/CZCxLkQ0gd4hAzZNU6KWCseiC2uCMEDOvbjxbDd4HR49X+AW/HdVEQM5vbi0YiNOJ0+kn/YK+4lrm/xc7n14KM2OG2ySFT5RvITrfNfPHf0h4NXZ8yWccep9MNXUymr87Fwxm0Vd15Ge/GlhFL0j9uwXq/9s7/GvI728n2VvP2OXeNn+tjh1NjunW4Vv2dT3J8E9uB3bWgGH0iOt4JcrTP8x/0pjJHBK8OofN8nhqG+RaVBM8EG461zznzOsyFSdvApNhiGUyp/+/HLH7x6a3H1FS0n2tA8eyrZ8cbn8mRMyTQbvj+SiTZMGvSxuR+afLL9AD7dno/PsOHdzMyx5+Kz7Jn4PPsvTd9kTiu5aF4AAAAASUVORK5CYII="},
//    
//    { cid:7, compname:"Oracle", des:"Software Solutions", url:"data:image/png;base64,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"},
//        
//        { cid:8, compname:"Microfocus", des:"Software and Consultancy", url:"data:image/png;base64,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"}
//    ];
//company.insertMany(myobj, function(err, res) {
//    if (err) throw err;
//    console.log("Input done!");
//  });

// var myobj2=[{ qid:1,cid:1,qname:"Largest Sum Contiguous Subarray",ques:"Given an array arr of N integers. Find the contiguous sub-array with maximum sum",level:"Easy",time_limit:30,score:10},
// {qid:2,cid:1,qname:"Count all possible paths from top left to bottom right of a mXn matrix",ques:"Count all the possible paths from top left to bottom right of a mXn matrix with the constraints that from each cell you can either move only to right or down",level:"Hard",time_limit:60,score:30},
// {qid:3,cid:2,qname:"K’th largest element in a stream",ques:"Given an infinite stream of integers, find the k’th largest element at any point of time.",level:"Medium",time_limit:45,score:20},
// {qid:4,cid:2,qname:"Reversal of singly linked list",ques:"Reverse a given linked list efficiently.",level:"Easy",time_limit:30,score:10},
// {qid:5,cid:3,qname:"Base 64 encoding decoding",ques:"Write a code for base 64 encoding decoding in Python",level:"Easy",time_limit:30,score:10},
// {qid:6,cid:4,qname:"Maximum sum",ques:"Find the maximum sum from root to a leaf node of a given n-ary tree( a tree with any number of children).",level:"Hard",time_limit:60,score:30},
// {qid:7,cid:4,qname:"Insertion of key",ques:"Insert a given key (a string) into a trie.",level:"Easy",time_limit:30,score:10},
// {qid:8,cid:5,qname:"Length of the smallest sub-string consisting of maximum distinct characters",ques:"Given a string of length N, find the length of the smallest sub-string consisting of maximum distinct characters. Note : Our output can have same character.",level:"Medium",time_limit:45,score:20},
// {qid:9,cid:5,qname:"Return maximum occurring character in an input string",ques:"Write an efficient function to return maximum occurring character in the input string e.g., if input string is “test” then function should return ‘t’.",level:"Easy",time_limit:30,score:10},
// {qid:10,cid:1,qname:"Binary tree to DLL",ques:"Given a binary tree, write a program to convert the binary tree to a doubly linked list.",level:"Medium",time_limit:45,score:20},
// {qid:11,cid:3,qname:"RSA Crypto system",ques:"Write an efficient code for RSA cryptographic system implementation",level:"Medium",time_limit:45,score:20},
// ];

// question.insertMany(myobj2,function(err,res){
//      if(err) throw error;
//      console.log("Done!!!");
//  });

codeapp.get('/',function(req,res){
    res.render("main.ejs");
});

codeapp.get('/homepage/:username',function(req,res){
    var username=req.params.username;
    company.find({},function(err,companyr){
        res.render("mainpage.ejs",{user:username,companyr:companyr});  
    })
});

codeapp.get('/login',function(req,res){
    res.render("login.ejs");  
});

codeapp.get('/signup',function(req,res){
    res.render("signup.ejs");  
});

codeapp.get('/:username/questions',function(req,res){
    var u=req.params.username;
    question.find({},function(err,questionr){
        res.render("questions.ejs",{questionr:questionr,u:u});  
    })
});

codeapp.get('/:username/questions/:compid',function(req,res){
    var u=req.params.username;
    var compid=req.params.compid;
    question.find({cid:compid},function(err,questionr){
        res.render("questions.ejs",{questionr:questionr,u:u});  
    })
});


codeapp.get('/:username/leaderboard',function(req,res){
    var u=req.params.username;
    user.find({},function(err,userr){
        res.render("leaderboard.ejs",{userr:userr,u:u});  
    }).sort( { total_score: -1 } );
});

codeapp.post('/signup',function(req,res){

    user.find({'uname':req.body.username},function(err,existing_users){
        console.log(existing_users);
        if(existing_users.length!=0){
            res.redirect('/signup');
        }
        else{
            user.find({},function(err, result){
                var len=result.length;
                console.log(len);
                var a =new user({
                    'uid':len+1,
                    'uname': req.body.username,
                    'email': req.body.email,
                    'pwd':req.body.password,
                    'total_score':0
                });
                a.save(function(err,users){
                    if(err) throw err;
                    res.redirect('/homepage/'+req.body.username);
                });
            })
        }
    });
})

codeapp.post('/loginsubmit',function(req,res){
    var uname=req.body.username;
    var pwd=req.body.password;
    user.find({uname:uname, pwd:pwd},function(err,userr){
        if(err) throw err;
        if(userr.length>0){
            res.redirect('/homepage/'+uname);
        }
        else{
            res.redirect('/login');
        }
    });
})


codeapp.get('/:username/editor/:qnid',function(req,res){
    var u=req.params.username;
    var qnid=req.params.qnid;
    questedit.find({qid:qnid},function(err,questeditr){
        question.find({qid:qnid},function(err,questionr){
            res.render("editor.ejs",{questionr:questionr,u:u,questeditr:questeditr});
        })         
    });
})

codeapp.post('/:username/editsubmit/:qnid',function(req,res){
    var u=req.params.username;
    var qnid=req.params.qnid;
    var bb1=req.body.bb1;
    var bb2=req.body.bb2;
    var bb3=req.body.bb3;
    var bb4=req.body.bb4;
    var bb5=req.body.bb5;
    var p=0;
    questedit.find({qid:qnid},function(err,questeditr){
        if(bb1.localeCompare(questeditr[0].b1)==0)
            p=p+1;
        if(bb2.localeCompare(questeditr[0].b2)==0)
            p=p+1;
        if(bb3.localeCompare(questeditr[0].b3)==0)
            p=p+1;
        if(bb4.localeCompare(questeditr[0].b4)==0)
            p=p+1;
        if(bb5.localeCompare(questeditr[0].b5)==0)
            p=p+1;
        question.find({qid:qnid},function(err,questionr){
            var point=p/5*questionr[0].score;
            dashboard.find({},function(err,dashr){
                var len=dashr.length;
                var pgm=new dashboard({
                    'did':len+1,
                    'uname':u,
                    'qid':qnid,
                    'rightans':p,
                    'wrongans':(5-p),
                    'points':point

                })
                pgm.save(function(err,users){
                    if(err) throw err;
                });
            })
            user.find({uname:u},function(err,userr){
                var sc=point+userr[0].total_score;
                var query={uname:u};
                var values={$set:{total_score:sc}};
                user.updateOne(query,values,{upsert:true},function(err,resi){
                    res.redirect('/'+u+'/dashboard');
                });
            })

        })         
    });
})

codeapp.get('/:username/dashboard',function(req,res){
    var u=req.params.username;
    dashboard.find({uname:u},function(err,dashr){
        res.render("dashboard.ejs",{u:u,dashr:dashr});
    })
})

codeapp.get('/:user/solution/:qid',function(req,res){
    var u=req.params.user;
    var qid=req.params.qid;
    question.find({qid:qid},function(err,questionr){
        solution.find({qid:qid},function(err,solutionr){
            res.render("solution.ejs",{u:u,questionr:questionr,solutionr:solutionr});
        })
    })
})


//codeapp.post('https://api.jdoodle.com/v1/execute',function(err,res,body){
//    var u=req.params.username;
//    var program = {
//        script : "<?php echo\"hello\"; ?>",
//        language: "php",
//        versionIndex: "0",
//        clientId: "9841d8da9ff8a139d67ce7a1e76d343f",
//        clientSecret:"4e6632d79608eab42470c85e39cc64328b36b741597d787c9096285dca651399"
//    };
//        console.log('error:', err);
//        console.log('statusCode:', res && res.statusCode);
//        console.log('body:', body);
//})


codeapp.set('port',process.env.PORT||8030)
codeapp.listen(codeapp.get('port'),function(){
    console.log(8030);
})
