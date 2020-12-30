package glitterFrameWork

import java.io.DataInputStream
import java.io.DataOutputStream
import java.net.HttpURLConnection
import java.net.URL
import java.text.ParseException
import java.text.SimpleDateFormat
import java.util.*


//時間計算"yyyy-MM-dd HH:mm:ss"格式
fun String.CalculateTime(): String {

    val nowTime = System.currentTimeMillis() // 获取当前时间的毫秒数
    var msg: String = "剛剛"
    val sdf =
            SimpleDateFormat("yyyy-MM-dd HH:mm:ss") // 指定时间格式
    var setTime: Date? = null // 指定时间
    try {
        setTime = sdf.parse(this) // 将字符串转换为指定的时间格式
    } catch (e: ParseException) {
        e.printStackTrace()
    }
    val reset = setTime!!.time // 获取指定时间的毫秒数
    val dateDiff = nowTime - reset
    if (dateDiff < 0) {
        msg = "剛剛"
    } else {
        val dateTemp1 = dateDiff / 1000 // 秒
        val dateTemp2 = dateTemp1 / 60 // 分钟
        val dateTemp3 = dateTemp2 / 60 // 小时
        val dateTemp4 = dateTemp3 / 24 // 天数
        val dateTemp5 = dateTemp4 / 30 // 月数
        val dateTemp6 = dateTemp5 / 12 // 年数
        if (dateTemp6 > 0) {
            msg = "1年前".replace("1", dateTemp6.toString())
        } else if (dateTemp5 > 0) {
            msg = "1個月前".replace("1", dateTemp5.toString())
        } else if (dateTemp4 > 0) {
            msg = "1天前".replace("1", dateTemp4.toString())
        } else if (dateTemp3 > 0) {
            msg = "1小時前".replace("1", dateTemp3.toString())
        } else if (dateTemp2 > 0) {
            msg = "1分鐘前".replace("1", dateTemp2.toString())
        } else if (dateTemp1 > 0) {
            msg = "剛剛"
        }
    }
    return msg
}

//Get 取得網頁原始碼
fun String.getWebResource(
        timeout: Int,
        downloadProgress: (a: Int) -> Unit = {}
): String? {
    return JzUtil.getRequest(this, timeout, downloadProgress)
}

//POST String
fun String.postRequest(
        timeout: Int,
        postString: String,
        uploadProgress: (a: Int) -> Unit = {},
        downloadProgress: (a: Int) -> Unit = {}
): String? {
    return JzUtil.postRequest(
        this,
        timeout,
        postString.toByteArray(),
        uploadProgress,
        downloadProgress
    )
}

//POST Data
fun String.postRequest(
        timeout: Int,
        postData: ByteArray,
        uploadProgress: (a: Int) -> Unit = {},
        downloadProgress: (a: Int) -> Unit = {}
): String? {
    return JzUtil.postRequest(this, timeout, postData, uploadProgress, downloadProgress)
}

object JzUtil {
    fun postRequest(
            url: String,
            timeout: Int,
            dataArray: ByteArray,
            uploadProgress: (a: Int) -> Unit = {},
            downloadProgress: (a: Int) -> Unit = {}
    ): String? {
        try {
            val conn: HttpURLConnection = URL(url).openConnection() as HttpURLConnection
            conn.connectTimeout = timeout
            conn.readTimeout = timeout
            conn.requestMethod = "POST"
            conn.doOutput = true
            conn.doInput = true;
            val inputStream = dataArray.inputStream()
            val wr = DataOutputStream(conn.outputStream)
            val buffer = ByteArray(1024)
            val length = inputStream.available()
            var uploaded = 0L
            inputStream.use {
                var read: Int
                while (inputStream.read(buffer).also { read = it } != -1) {
                    uploaded += read
                    wr.write(buffer, 0, read)
                    uploadProgress((uploaded * 100 / length).toInt())
                    wr.flush()
                }
            }
            wr.close()
            val reader = DataInputStream(conn.inputStream)
            var strBuf = ""
            var downLoad = 0L
            reader.use {
                var read: Int
                while (reader.read(buffer).also { read = it } != -1) {
                    downLoad += read
                    strBuf += String(buffer.copyOfRange(0, read))
                    if (reader.available() > 0) {
                        downloadProgress((downLoad * 100 / reader.available()).toInt())
                    }

                }
            }
            reader.close()
            return strBuf.toString()
        } catch (e: Exception) {
            e.printStackTrace()
            return null
        }
    }

    fun getRequest(
            url: String, timeout: Int, downloadProgress: (a: Int) -> Unit = {}
    ): String? {
        try {
            val conn: HttpURLConnection = URL(url).openConnection() as HttpURLConnection
            conn.connectTimeout = timeout
            conn.readTimeout = timeout
            conn.requestMethod = "GET"
            conn.doInput = true;
            val buffer = ByteArray(1024)
            val reader = DataInputStream(conn.inputStream)
            var strBuf = ""
            var downLoad = 0L
            reader.use {
                var read: Int
                while (reader.read(buffer).also { read = it } != -1) {
                    downLoad += read
                    strBuf += String(buffer.copyOfRange(0, read))
                    if (reader.available() > 0) {
                        downloadProgress((downLoad * 100 / reader.available()).toInt())
                    }
                }
            }
            reader.close()
            return strBuf.toString()
        } catch (e: Exception) {
            e.printStackTrace()
            return null
        }
    }
}

//将utf-8的汉字转换成unicode格式汉字码
fun String.stringToUnicode(): String? {
    var str = this
    str = str ?: ""
    var tmp: String
    val sb = StringBuffer(1000)
    var c: Char
    var i: Int
    var j: Int
    sb.setLength(0)
    i = 0
    while (i < str.length) {
        c = str[i]
        sb.append("\\\\u")
        j = c.toInt() ushr 8 //取出高8位
        tmp = Integer.toHexString(j)
        if (tmp.length == 1) sb.append("0")
        sb.append(tmp)
        j = c.toInt() and 0xFF //取出低8位
        tmp = Integer.toHexString(j)
        if (tmp.length == 1) sb.append("0")
        sb.append(tmp)
        i++
    }
    return String(sb)
}

//将unicode的汉字码转换成utf-8格式的汉字
fun String.unicodeToString(): String? {
    val string = StringBuffer()
    val hex = this.replace("\\\\u", "\\u").split("\\u").toTypedArray()
    for (i in 1 until hex.size) { //        System.out.println(hex[i].length());
        if (hex[i].length > 4) {
            string.append(hex[i].substring(4))
        }
        val data = hex[i].substring(0, 4).toInt(16)
        // 追加成string
        string.append(data.toChar())
    }
    return if (hex.size <= 1) this else string.toString()
}
fun Date.calYear(a: Int): Date {
    val rightNow = Calendar.getInstance()
    rightNow.time = this
    rightNow.add(Calendar.YEAR, a)
    return rightNow.time
}

fun Date.calMounth(a: Int): Date {
    val rightNow = Calendar.getInstance()
    rightNow.time = this
    rightNow.add(Calendar.MONTH, a)
    return rightNow.time
}

fun Date.calDay(a: Int): Date {
    val rightNow = Calendar.getInstance()
    rightNow.time = this
    rightNow.add(Calendar.DAY_OF_YEAR, a)
    return rightNow.time
}