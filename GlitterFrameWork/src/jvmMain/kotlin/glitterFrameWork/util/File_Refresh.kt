package glitterFrameWork.util

import io.ktor.application.call
import io.ktor.http.ContentType
import io.ktor.response.respondFile
import io.ktor.response.respondText
import io.ktor.routing.Routing
import io.ktor.routing.get
import java.io.File

object File_Refresh {
    var allpath = ArrayList<String>()
    fun fileRefresh(rout: Routing,root:Array<String>) {
        Thread {
            while (true) {
                try {
                    rout {
                        for(a in root){
                            for (i in File_util.getAllFiles(File(a))) {
                                if (i.isFile && !allpath.contains(i.path)) {
                                    allpath.add(i.path)
                                    println("rout"+i.path.replace("\\","/"))
                                    when (i.extension) {
                                        "html" -> {
                                            get(i.path.replace("\\","/")) {
                                                call.respondText(i.readText(), ContentType.Text.Html)
                                            }
                                        }
                                        else -> {
                                            get(i.path.replace("\\","/")) {
                                                call.respondFile(i)
                                            }
                                        }
                                    }
                                }
                            }
                        }

                    }
                }catch (e:Exception){e.printStackTrace()}
                Thread.sleep(1000*30)
            }
        }.start()
    }
}

object File_util {
    fun getAllFiles(file: File): ArrayList<File> {
        val fileList = ArrayList<File>()
        for (i in file.listFiles()) {
            fileList.add(i)
            if (i.isDirectory) {
                fileList.addAll(getAllFiles(i))
            }
        }
        return fileList
    }
}