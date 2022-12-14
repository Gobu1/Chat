<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
            <!DOCTYPE html>
            <html>

            <head>
                <meta charset="UTF-8">
                <title>Insert title here</title>
                <c:import url="./temp/boot.jsp"></c:import>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.1.5/sockjs.min.js"></script>
    			<script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>
                <script src="/js/app.js"></script><script src="/js/qeustion.js"></script>
            </head>

            <body>
                <noscript>
                    <h2 style="color: #ff0000">Seems your browser doesn't support Javascript! Websocket relies on
                        Javascript being
                        enabled. Please enable
                        Javascript and reload this page!</h2>
                </noscript>
                <div id="main-content" class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <form class="form-inline">
                                <div class="form-group">
                                    <!-- <label for="connect">웹소켓 연결:</label>
                                    <button id="connect" class="btn btn-default" type="submit">연결</button>
                                    <button id="disconnect" class="btn btn-default" type="submit" disabled="disabled">해제
                                    </button> -->
                                </div>
                            </form>
                        </div>
                        <div class="col-md-6">
                            <form class="form-inline">
                                <div class="form-group">
                                    <label for="msg">문의사항</label>
                                    <input type="text" id="msg" class="form-control" placeholder="내용을 입력하세요....">
                                </div>
                                <button id="send" class="btn btn-default" type="submit">보내기</button>
                            </form>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <table id="conversation" class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>메세지</th>
                                    </tr>
                                </thead>
                                <tbody id="communicate">
                                    <tr><td>시작하기 : <button id="connect" class="btn btn-default" type="submit">연결</button></td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <a href="./chat/room">챗</a>
            </body>

            </html>