package glitterFrameWork

import glitterFrameWork.util.File_Refresh
import glitterFrameWork.util.ZipUtil
import io.ktor.application.call
import io.ktor.response.respondFile
import io.ktor.response.respondText
import io.ktor.routing.Routing
import io.ktor.routing.get
import java.io.File

object Glitter {
    fun setUp(rout:Routing){
        rout{
            //取得Glitter版本號
            get("/GlitterVersion") {
                call.respondText(File("resources/${call.parameters["AppName"]}/version").readText())
            }
            //下載Glitter
            get("/GetGlitter") {
                val nowVersion = File("resources/${call.parameters["AppName"]}/version").readText()
                while(ZipUtil.UnZip){Thread.sleep(1000)}
                var versionRout= File("resources/${call.parameters["AppName"]}/VersionHistory")
                if(!versionRout.exists()){
                    versionRout.mkdir()
                }
                if (!File("$versionRout/${nowVersion}.zip").exists()) {
                    println("unzip")
                    ZipUtil.unzip("resources/${call.parameters["AppName"]}",nowVersion)
                }
                val file= File("$versionRout/${call.parameters["version"]}.zip")
                if(file.exists()){
                    call.respondFile(File("$versionRout/${call.parameters["version"]}.zip"))
                }else{
                    call.respondText("nodata")
                }
            }
            //文件更新
            File_Refresh.fileRefresh(rout, arrayOf("resources"))
        }
    }
}